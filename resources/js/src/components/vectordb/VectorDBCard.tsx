import React from 'react';
import Card from '@/src/components/cards/Card';
import Badge from '@/src/components/badges/Badge';

export default function VectorDBCard({ name, active }: { name: string; active: boolean }) {
  return <Card><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>{name}</strong><Badge label={active ? 'Active' : 'Inactive'} color={active ? 'success' : 'info'} /></div></Card>;
}
