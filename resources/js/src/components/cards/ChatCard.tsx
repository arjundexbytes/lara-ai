import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@/src/components/cards/Card';

export default function ChatCard({ role, content, type = 'text' }: { role: string; content: unknown; type?: 'text' | 'table' | 'json' | 'html' | 'document' | 'audio' | 'video' }) {
  const render = () => {
    if (type === 'table' && Array.isArray((content as any)?.rows)) {
      return <pre>{JSON.stringify(content, null, 2)}</pre>;
    }
    if (type === 'html') return <div dangerouslySetInnerHTML={{ __html: String(content || '') }} />;
    if (type === 'audio') return <audio controls src={String(content || '')} />;
    if (type === 'video') return <video controls src={String(content || '')} style={{ maxWidth: '100%' }} />;
    if (type === 'document') return <a href={String(content || '#')}>Open document</a>;
    if (type === 'json' || typeof content === 'object') return <pre>{JSON.stringify(content, null, 2)}</pre>;
    return <Typography>{String(content || '')}</Typography>;
  };

  return <Card><Typography variant="caption">{role}</Typography>{render()}</Card>;
}
