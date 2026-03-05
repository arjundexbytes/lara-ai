import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export default function Table({ rows, columns, loading = false }: { rows: any[]; columns: GridColDef[]; loading?: boolean }) {
  return <div style={{ height: 400, width: '100%' }}><DataGrid rows={rows} columns={columns} loading={loading} /></div>;
}
