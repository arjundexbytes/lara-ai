import React from 'react';
import MuiPagination from '@mui/material/Pagination';

export default function Pagination({ page, count, onChange }: { page: number; count: number; onChange: (value: number) => void }) {
  return <MuiPagination page={page} count={count} onChange={(_, v) => onChange(v)} />;
}
