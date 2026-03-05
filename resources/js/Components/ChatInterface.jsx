import React, { useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '@/store/slices/chatSlice';
import { pushNotification } from '@/store/slices/notificationSlice';

const quickQueries = [
  'Show completed orders by user for last 30 days',
  'Summarize top products by revenue this quarter',
  'Find policy documents for refunds and summarize',
];

function renderMessageBody(message) {
  const content = message.message;

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
  const dispatch = useDispatch();
  const { conversationId, messages } = useSelector((state) => state.chat);
  const boxRef = useRef(null);

  const sortedMessages = useMemo(() => [...messages].reverse(), [messages]);

  const submit = async (event) => {
    event.preventDefault();

    if (!query.trim() || query.length < 5) {
      dispatch(pushNotification({ type: 'error', message: 'Please enter at least 5 characters.' }));
      return;
    }

    dispatch(addMessage({ role: 'user', message: query, created_at: new Date().toISOString() }));
    setLoading(true);

    try {
      const { data } = await axios.post('/api/ai-v2/query', {
        query,
        format: 'json',
        conversation_id: conversationId,
      });

      dispatch(addMessage({ role: 'assistant', message: data?.data?.completion || data?.completion || 'No response.', created_at: new Date().toISOString() }));
      dispatch(pushNotification({ type: 'success', message: 'AI response received successfully.' }));
      setQuery('');
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
          {quickQueries.map((item) => (
            <button key={item} onClick={() => setQuery(item)} className="rounded-full border px-3 py-1 transition hover:bg-slate-100">
              {item}
            </button>
          ))}
        </div>
      </div>

      <div ref={boxRef} className="flex flex-col gap-3 overflow-y-auto rounded border p-3">
        {loading ? <div className="w-28 animate-pulse rounded bg-blue-50 p-2 text-xs text-blue-700">Assistant is typing…</div> : null}
        {sortedMessages.map((message, idx) => (
          <article key={`${message.created_at || 'm'}-${idx}`} className={`max-w-[95%] rounded-lg border p-3 ${message.role === 'assistant' ? 'self-start bg-blue-50 text-blue-900' : 'self-end bg-slate-100 text-slate-900'}`}>
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide opacity-70">{message.role}</div>
            {renderMessageBody(message)}
          </article>
        ))}
      </div>

      <form onSubmit={submit} className="sticky bottom-0 flex gap-2 bg-white pt-1">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="flex-1 rounded border px-3 py-2"
          placeholder="Ask for RAG summaries, aggregates, or user order insights"
          aria-label="Chat query input"
        />
        <button disabled={loading} className="rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-60" aria-busy={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
