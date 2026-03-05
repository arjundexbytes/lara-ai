import React from 'react';
import Card from '@/src/components/cards/Card';

export default function AnimatedChart({ data }: { data: Array<{ label: string; value: number }> }) {
  return <Card><pre>{JSON.stringify(data, null, 2)}</pre></Card>;
}
