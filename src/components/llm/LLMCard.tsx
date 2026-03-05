import React from 'react';
import Card from '@/src/components/cards/Card';

export default function LLMCard({ model }: { model: string }) {
  return <Card><strong>Current LLM:</strong> {model}</Card>;
}
