import React from 'react';
import Stack from '@mui/material/Stack';
import Badge from '@/src/components/badges/Badge';

export default function ConnectionStatus({ db, redis, ai }: { db: boolean; redis: boolean; ai: boolean }) {
  return <Stack direction="row" spacing={1}><Badge label={`DB: ${db}`} color={db ? 'success' : 'error'} /><Badge label={`Redis: ${redis}`} color={redis ? 'success' : 'error'} /><Badge label={`AI: ${ai}`} color={ai ? 'success' : 'warning'} /></Stack>;
}
