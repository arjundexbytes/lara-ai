import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@/src/components/buttons/Button';
import { useAI } from '@/src/context/AIContext';
import { useAIQuery } from '@/src/hooks/useAIQuery';
import ChatHistoryList from '@/src/components/history/ChatHistoryList';
import LoaderWrapper from '@/src/components/wrappers/LoaderWrapper';

export default function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [error, setError] = useState('');
  const { conversationId } = useAI();
  const { loading, query } = useAIQuery();

  const send = async () => {
    try {
      const response = await query(input, conversationId);
      setMessages((m) => [{ role: 'assistant', content: response, type: 'json' }, { role: 'user', content: input, type: 'text' }, ...m]);
      setInput('');
      setError('');
    } catch {
      setError('Failed to fetch AI response');
    }
  };

  return <Stack spacing={2}><TextField value={input} onChange={(e) => setInput(e.target.value)} label="Ask AI" /><Button loading={loading} onClick={send}>Send</Button><LoaderWrapper loading={false} error={error}><ChatHistoryList messages={messages} /></LoaderWrapper></Stack>;
}
