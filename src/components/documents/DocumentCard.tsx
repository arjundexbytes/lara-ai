import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@/src/components/cards/Card';

export default function DocumentCard({ item }: { item: { title: string; file_type: string; content?: string } }) {
  return <Card><Typography variant="subtitle2">{item.file_type}</Typography><Typography variant="h6">{item.title}</Typography><Typography variant="body2">{item.content || ''}</Typography></Card>;
}
