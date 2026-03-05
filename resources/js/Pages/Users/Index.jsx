import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UsersTable from '@/Components/UsersTable';
import AppLayout from '@/Layouts/AppLayout';

export default function UsersIndex() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    setPayload(null);
    axios.get('/api/users', { params: { q: query, page } }).then(({ data }) => setPayload(data));
  }, [query, page]);

  return (
    <AppLayout title="Users">
      <div className="mb-4 flex gap-2">
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded border px-3 py-2" placeholder="Search users" />
        <button className="rounded border px-3 py-2">Add User</button>
      </div>
      {!payload ? <div className="h-16 animate-pulse rounded bg-slate-200" /> : <UsersTable users={payload.data} />}
      <div className="mt-3 flex gap-2">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="rounded border px-3 py-1">Prev</button>
        <span className="text-sm">Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)} className="rounded border px-3 py-1">Next</button>
      </div>
    </AppLayout>
  );
}
