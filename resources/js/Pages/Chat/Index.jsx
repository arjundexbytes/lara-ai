import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ChatInterface from '@/Components/ChatInterface';

export default function ChatIndex() {
  return (
    <AppLayout title="AI Multi-turn Chat">
      <ChatInterface />
    </AppLayout>
  );
}
