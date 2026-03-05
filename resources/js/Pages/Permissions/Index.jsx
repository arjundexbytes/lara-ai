import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppLayout from '@/Layouts/AppLayout';
import { useDispatch } from 'react-redux';
import { pushNotification } from '@/store/slices/notificationSlice';

export default function PermissionsIndex() {
  const [payload, setPayload] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const load = () => {
    setPayload(null);
    axios.get('/api/permissions', { params: { q: query, page } }).then(({ data }) => setPayload(data)).catch(() => dispatch(pushNotification({ type: 'error', message: 'Failed to load permissions.' })));
  };

  useEffect(() => { load(); }, [query, page]);

  const createPermission = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      await axios.post('/api/permissions', { name });
      setName('');
      dispatch(pushNotification({ type: 'success', message: 'Permission created.' }));
      load();
    } finally { setLoading(false); }
  };

  const removePermission = async (permission) => {
    if (!window.confirm(`Delete permission ${permission.name}?`)) return;
    setLoading(true);
    try {
      await axios.delete(`/api/permissions/${permission.id}`);
      dispatch(pushNotification({ type: 'success', message: 'Permission deleted.' }));
      load();
    } finally { setLoading(false); }
  };

  return (
    <AppLayout title="Permissions">
      <div className="mb-4 rounded border bg-white p-4">
        <div className="mb-2 font-semibold">Create Permission</div>
        <div className="flex gap-2">
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded border px-3 py-2" placeholder="Permission name" />
          <button disabled={loading} onClick={createPermission} className="rounded border px-3 py-2 disabled:opacity-60">{loading ? 'Saving...' : 'Create'}</button>
        </div>
      </div>
      <div className="mb-4 flex gap-2">
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded border px-3 py-2" placeholder="Search permissions" />
      </div>
      {!payload ? <div className="h-16 animate-pulse rounded bg-slate-200" /> : (
        <div className="rounded border bg-white p-2">
          {payload.data.map((permission) => (
            <div key={permission.id} className="flex items-center justify-between border-b p-2 text-sm last:border-b-0">
              <span>{permission.name}</span>
              <div className="space-x-2">
                <button className="rounded border px-2 py-1">Edit</button>
                <button onClick={() => removePermission(permission)} className="rounded border border-red-300 px-2 py-1 text-red-700">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-3 flex gap-2">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="rounded border px-3 py-1">Prev</button>
        <span className="text-sm">Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)} className="rounded border px-3 py-1">Next</button>
      </div>
    </AppLayout>
  );
}
