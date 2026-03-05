import React from 'react';
import MuiAlert from '@mui/material/Alert';

export default function Alert({ severity = 'error', children }: { severity?: 'success' | 'info' | 'warning' | 'error'; children: React.ReactNode }) {
  return <MuiAlert severity={severity}>{children}</MuiAlert>;
}
