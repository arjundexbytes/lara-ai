import React from 'react';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { GridColDef } from '@mui/x-data-grid';
import Table from '@/src/components/tables/Table';

export default function PaginatedTable({ rows, columns, page, pages, onPageChange, loading = false }: { rows: any[]; columns: GridColDef[]; page: number; pages: number; onPageChange: (page: number) => void; loading?: boolean }) {
  return <Stack spacing={2}><Table rows={rows} columns={columns} loading={loading} /><Pagination page={page} count={pages} onChange={(_, value) => onPageChange(value)} /></Stack>;
}
