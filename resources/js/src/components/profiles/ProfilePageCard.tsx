import React from 'react';
import Card from '@/src/components/cards/Card';

export default function ProfilePageCard({ title, payload }: { title: string; payload: unknown }) {
  return <Card><h3>{title}</h3><pre>{JSON.stringify(payload, null, 2)}</pre></Card>;
}
