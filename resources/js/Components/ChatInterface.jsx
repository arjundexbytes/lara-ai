import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '@/store/slices/chatSlice';
import { pushNotification } from '@/store/slices/notificationSlice';
import { enterpriseApi } from '@/services/api/enterpriseApi';
import Button from '@/Components/UI/Button';
import Skeleton from '@/Components/UI/Skeleton';
import Modal from '@/Components/UI/Modal';

const quickQueries = [
  'Show completed orders by user for last 30 days',
  'Summarize top products by revenue this quarter',
  'Find policy documents for refunds and summarize',
];

function sanitizeHtml(html) {
  return String(html || '').replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
}

function renderMessageBody(message) {
  const content = message.message;
  const type = message.content_type;

  if (type === 'table' && Array.isArray(content?.rows)) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border text-xs">
          <thead><tr>{(content.headers || []).map((h) => <th key={h} className="border px-2 py-1 text-left">{h}</th>)}</tr></thead>
          <tbody>{content.rows.map((row, i) => <tr key={i}>{row.map((cell, ci) => <td key={ci} className="border px-2 py-1">{String(cell)}</td>)}</tr>)}</tbody>
        </table>
      </div>
    );
  }

  if (type === 'html') {
    return <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }} />;
  }

  if (type === 'audio') {
    return <audio controls className="w-full" src={String(content || '')} />;
  }

  if (type === 'video') {
    return <video controls className="max-h-64 w-full rounded" src={String(content || '')} />;
  }

  if (type === 'document') {
    return <a className="text-blue-700 underline" href={String(content || '#')} target="_blank" rel="noreferrer">Open document preview</a>;
  }

  if (typeof content === 'object') {
    return <pre className="overflow-x-auto rounded bg-slate-900 p-2 text-xs text-slate-100">{JSON.stringify(content, null, 2)}</pre>;
  }

  const text = String(content || '');

  if (text.startsWith('{') || text.startsWith('[')) {
    return <pre className="overflow-x-auto rounded bg-slate-900 p-2 text-xs text-slate-100">{text}</pre>;
  }

  return <p className="whitespace-pre-wrap break-words leading-relaxed">{text}</p>;
}

export default function ChatInterface() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(20);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [uploadsOpen, setUploadsOpen] = useState(false);
  const [uploads, setUploads] = useState(null);
  const [uploadsLoading, setUploadsLoading] = useState(false);
  const [uploadsQuery, setUploadsQuery] = useState('');
  const dispatch = useDispatch();
  const { conversationId, messages } = useSelector((state) => state.chat);
  const boxRef = useRef(null);

  const sortedMessages = useMemo(() => [...messages].reverse(), [messages]);
  const visibleMessages = sortedMessages.slice(0, visibleCount);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    const onScroll = () => {
      if (box.scrollTop + box.clientHeight >= box.scrollHeight - 12 && visibleCount < sortedMessages.length) {
        setLoadingOlder(true);
        setTimeout(() => {
          setVisibleCount((n) => n + 20);
          setLoadingOlder(false);
        }, 350);
      }
    };

    box.addEventListener('scroll', onScroll);

    return () => box.removeEventListener('scroll', onScroll);
  }, [visibleCount, sortedMessages.length]);


  const loadUploads = async () => {
    setUploadsLoading(true);
    try {
      const data = await enterpriseApi.getUploads({ conversation_id: conversationId, q: uploadsQuery, per_page: 12 });
      setUploads(data);
    } catch {
      dispatch(pushNotification({ type: 'error', message: 'Failed to load uploaded files.' }));
    } finally {
      setUploadsLoading(false);
    }
  };

  const submit = async (event) => {
    event.preventDefault();

    if (!query.trim() || query.length < 5) {
      dispatch(pushNotification({ type: 'error', message: 'Please enter at least 5 characters.' }));
      return;
    }

    dispatch(addMessage({ role: 'user', message: query, content_type: 'text', created_at: new Date().toISOString() }));
    setLoading(true);

    try {
      const data = await enterpriseApi.askAi({
        query,
        format: 'json',
        conversation_id: conversationId,
      });

      dispatch(addMessage({ role: 'assistant', message: data?.data?.completion || data?.completion || 'No response.', content_type: 'text', created_at: new Date().toISOString() }));
      dispatch(pushNotification({ type: 'success', message: 'AI response received successfully.' }));
      setQuery('');
      setVisibleCount((n) => Math.max(n, 20));
      boxRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      const fallback = error?.response?.data?.message || 'Failed to fetch AI response.';
      dispatch(pushNotification({ type: 'error', message: fallback }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid h-[calc(100vh-160px)] grid-rows-[auto_1fr_auto] gap-3 rounded-lg border bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <span>Conversation: {conversationId}</span>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => { setUploadsOpen(true); loadUploads(); }} className="rounded border px-3 py-1 text-xs" aria-label="Uploaded files">📁 Uploaded Files</button>
          {quickQueries.map((item) => (
            <button key={item} onClick={() => setQuery(item)} className="rounded-full border px-3 py-1 transition hover:bg-slate-100">
              {item}
            </button>
          ))}
        </div>
      </div>

      <div ref={boxRef} className="flex flex-col gap-3 overflow-y-auto rounded border p-3">
        {loading ? <div className="w-28 animate-pulse rounded bg-blue-50 p-2 text-xs text-blue-700">Assistant is typing…</div> : null}
        {visibleMessages.map((message, idx) => (
          <article key={`${message.created_at || 'm'}-${idx}`} className={`max-w-[95%] rounded-lg border p-3 ${message.role === 'assistant' ? 'self-start bg-blue-50 text-blue-900' : 'self-end bg-slate-100 text-slate-900'}`}>
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide opacity-70">{message.role}</div>
            {renderMessageBody(message)}
          </article>
        ))}
        {loadingOlder ? <Skeleton className="h-16" /> : null}
      </div>


      <Modal
        open={uploadsOpen}
        onClose={() => setUploadsOpen(false)}
        title="Uploaded Files"
        footer={(
          <button onClick={() => setUploadsOpen(false)} className="rounded border px-3 py-2">Close</button>
        )}
      >
        <div className="mb-2">
          <input value={uploadsQuery} onChange={(e) => setUploadsQuery(e.target.value)} className="w-full rounded border px-3 py-2" placeholder="Search uploaded files" />
          <button onClick={loadUploads} className="mt-2 rounded border px-3 py-1 text-sm">Search</button>
        </div>
        {uploadsLoading ? <Skeleton className="h-16" /> : (
          <div className="grid gap-2 md:grid-cols-2">
            {(uploads?.data || []).map((item) => (
              <div key={item.id} className="rounded border p-2 text-sm">
                <div className="truncate font-semibold">{item.name}</div>
                <div className="text-xs text-slate-500">{item.mime_type}</div>
                {item.mime_type?.startsWith('image/') ? <img src={item.url} alt={item.name} className="mt-2 h-20 w-full rounded object-cover" /> : null}
                {item.mime_type?.startsWith('audio/') ? <audio controls className="mt-2 w-full" src={item.url} /> : null}
                {item.mime_type?.startsWith('video/') ? <video controls className="mt-2 w-full" src={item.url} /> : null}
                {!item.mime_type?.startsWith('image/') && !item.mime_type?.startsWith('audio/') && !item.mime_type?.startsWith('video/') ? <a className="mt-2 inline-block text-blue-700 underline" href={item.url} target="_blank" rel="noreferrer">Download</a> : null}
              </div>
            ))}
          </div>
        )}
      </Modal>

      <form onSubmit={submit} className="sticky bottom-0 flex gap-2 bg-white pt-1">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="flex-1 rounded border px-3 py-2"
          placeholder="Ask for RAG summaries, aggregates, or user order insights"
          aria-label="Chat query input"
        />
        <Button loading={loading} aria-busy={loading}>Send</Button>
      </form>
    </div>
  );
}
