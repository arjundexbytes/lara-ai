import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Badge from '@/src/components/badges/Badge';

export default function Topbar({ latency, status }: { latency: number; status: string }) {
  return <Stack direction="row" justifyContent="space-between" alignItems="center"><Typography variant="h6">Enterprise AI</Typography><Stack direction="row" spacing={1}><Badge label={`Latency: ${Math.round(latency)}ms`} color="info" /><Badge label={`Status: ${status}`} color={status === 'healthy' ? 'success' : 'warning'} /></Stack></Stack>;
}
