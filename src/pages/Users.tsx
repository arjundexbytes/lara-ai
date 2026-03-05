import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import PaginatedTable from '@/src/components/tables/PaginatedTable';
import { usePagination } from '@/src/hooks/usePagination';
import { useFetch } from '@/src/hooks/useFetch';
import { apiService } from '@/src/api/apiService';

export default function Users() {
  const { page, setPage } = usePagination();
  const { data, loading } = useFetch(() => apiService.users({ page }), [page]);
  const columns: GridColDef[] = [{ field: 'id' }, { field: 'name', flex: 1 }, { field: 'email', flex: 1 }];
  return <PaginatedTable rows={(data as any)?.data || []} columns={columns} page={page} pages={Math.ceil(((data as any)?.total || 1) / ((data as any)?.per_page || 10))} onPageChange={setPage} loading={loading} />;
}
