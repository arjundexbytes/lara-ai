import React from 'react';
import Chip from '@mui/material/Chip';

export default function Badge({ label, color = 'default' }: { label: string; color?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' }) {
  return <Chip size="small" label={label} color={color === 'default' ? undefined : color} />;
}
