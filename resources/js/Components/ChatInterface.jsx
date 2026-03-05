import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '@/store/slices/chatSlice';
import { pushNotification } from '@/store/slices/notificationSlice';

const quickQueries = [
  'Show completed orders by user for last 30 days',
  'Summarize top products by revenue this quarter',
  'Find policy documents for refunds and summarize',
];

export default function ChatInterface() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { conversationId, messages } = useSelector((state) => state.chat);

  const submit = async (event) => {
    event.preventDefault();

    if (!query.trim() || query.length < 5) {
      dispatch(pushNotification({ type: 'error', message: 'Please enter at least 5 characters.' }));
      return;
    }

    dispatch(addMessage({ role: 'user', message: query }));
    setLoading(true);

    try {
      const { data } = await axios.post('/api/ai-v2/query', {
        query,
        format: 'json',
        conversation_id: conversationId,
      });

      dispatch(addMessage({ role: 'assistant', message: data.data.completion }));
      dispatch(pushNotification({ type: 'success', message: 'AI response received successfully.' }));
      setQuery('');
    } catch (error) {
      const fallback = error?.response?.data?.message || 'Failed to fetch AI response.';
      dispatch(pushNotification({ type: 'error', message: fallback }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 rounded-lg border bg-white p-4">
      <div className="text-xs text-slate-500">Conversation: {conversationId}</div>
      <div className="flex flex-wrap gap-2">
        {quickQueries.map((item) => (
          <button key={item} onClick={() => setQuery(item)} className="rounded-full border px-3 py-1 text-xs transition hover:bg-slate-100">
            {item}
          </button>
        ))}
      </div>
      <div className="h-96 space-y-2 overflow-y-auto rounded border p-3">
        {messages.map((message, idx) => (
          <div key={idx} className={`rounded p-2 transition-all duration-300 ${message.role === 'assistant' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-900'}`}>
            <strong className="mr-2">{message.role}:</strong>
            {message.message}
          </div>
        ))}
      </div>
      <form onSubmit={submit} className="flex gap-2">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="flex-1 rounded border px-3 py-2"
          placeholder="Ask for RAG summaries, aggregates, or user order insights"
        />
        <button disabled={loading} className="rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-60">
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
