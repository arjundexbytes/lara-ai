import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@/src/components/alerts/Alert';

export default function Toast({ open, message, severity = 'info', onClose }: { open: boolean; message: string; severity?: 'success' | 'error' | 'info' | 'warning'; onClose: () => void }) {
  return <Snackbar open={open} autoHideDuration={3000} onClose={onClose}><div><Alert severity={severity}>{message}</Alert></div></Snackbar>;
}
