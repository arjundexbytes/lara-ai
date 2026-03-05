import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@/src/components/buttons/Button';

export default function ConfirmationBox({ message, onConfirm, onCancel, loading = false }: { message: string; onConfirm: () => void; onCancel: () => void; loading?: boolean }) {
  return <Stack spacing={2}><Typography>{message}</Typography><Stack direction="row" spacing={1}><Button variant="warning" onClick={onCancel}>Cancel</Button><Button variant="danger" loading={loading} onClick={onConfirm}>Confirm</Button></Stack></Stack>;
}
