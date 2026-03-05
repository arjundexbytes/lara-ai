import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '@/store/slices/chatSlice';

export default function ChatInterface() {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { conversationId, messages } = useSelector((state) => state.chat);

  const submit = async (event) => {
    event.preventDefault();
    if (!query.trim()) return;

    dispatch(addMessage({ role: 'user', message: query }));

    const { data } = await axios.post('/api/ai-v2/query', {
      query,
      format: 'json',
      conversation_id: conversationId,
    });

    dispatch(addMessage({ role: 'assistant', message: data.data.completion }));
    setQuery('');
  };

  return (
    <div className="space-y-4 rounded-lg border bg-white p-4">
      <div className="text-xs text-slate-500">Conversation: {conversationId}</div>
      <div className="h-96 space-y-2 overflow-y-auto rounded border p-3">
        {messages.map((message, idx) => (
          <div key={idx} className={message.role === 'assistant' ? 'text-blue-700' : 'text-slate-900'}>
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
        <button className="rounded bg-slate-900 px-4 py-2 text-white">Send</button>
      </form>
    </div>
  );
}
