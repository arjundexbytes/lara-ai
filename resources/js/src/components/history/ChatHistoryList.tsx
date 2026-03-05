import React from 'react';
import Stack from '@mui/material/Stack';
import ChatCard from '@/src/components/cards/ChatCard';

export default function ChatHistoryList({ messages }: { messages: Array<{ role: string; content: unknown; type?: any }> }) {
  return <Stack spacing={1}>{messages.map((m, i) => <ChatCard key={i} role={m.role} content={m.content} type={m.type} />)}</Stack>;
}
