import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@/src/components/buttons/Button';
import ChatCard from '@/src/components/cards/ChatCard';
import { useAI } from '@/src/context/AIContext';
import { useAIQuery } from '@/src/hooks/useAIQuery';

export default function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const { conversationId } = useAI();
  const { loading, query } = useAIQuery();

  const send = async () => {
    const response = await query(input, conversationId);
    setMessages((m) => [{ role: 'assistant', content: response, type: 'json' }, { role: 'user', content: input, type: 'text' }, ...m]);
    setInput('');
  };

  return <Stack spacing={2}><TextField value={input} onChange={(e) => setInput(e.target.value)} label="Ask AI" /><Button loading={loading} onClick={send}>Send</Button>{messages.map((m, i) => <ChatCard key={i} role={m.role} content={m.content} type={m.type} />)}</Stack>;
}
