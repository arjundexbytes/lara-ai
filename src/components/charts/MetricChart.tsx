import React from 'react';
import Card from '@/src/components/cards/Card';
import Typography from '@mui/material/Typography';

export default function MetricChart({ title, value }: { title: string; value: string | number }) {
  return <Card><Typography variant="subtitle2">{title}</Typography><Typography variant="h6">{value}</Typography></Card>;
}
