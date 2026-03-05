import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import Table from '@/src/components/tables/Table';

export default function AnalyticsTable({ rows }: { rows: any[] }) {
  const columns: GridColDef[] = [{ field: 'metric', flex: 1 }, { field: 'value', flex: 1, type: 'number' }];
  return <Table rows={rows} columns={columns} />;
}
