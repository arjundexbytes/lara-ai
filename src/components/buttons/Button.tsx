import React from 'react';
import MuiButton from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Variant } from '@/src/types/ui';

const map: Record<Variant, 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'info'> = {
  primary: 'primary', secondary: 'secondary', danger: 'error', warning: 'warning', success: 'success', info: 'info',
};

export default function Button({ variant = 'primary', loading = false, children, ...props }: React.ComponentProps<typeof MuiButton> & { variant?: Variant; loading?: boolean }) {
  return <MuiButton variant="contained" color={map[variant]} disabled={loading || props.disabled} {...props}>{loading ? <CircularProgress size={18} color="inherit" /> : children}</MuiButton>;
}
