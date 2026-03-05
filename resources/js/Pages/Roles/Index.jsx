import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppLayout from '@/Layouts/AppLayout';
import { useDispatch } from 'react-redux';
import { pushNotification } from '@/store/slices/notificationSlice';

export default function RolesIndex() {
  const [payload, setPayload] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [modalRole, setModalRole] = useState(null);
  const [permissions, setPermissions] = useState(['query ai']);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const load = () => {
    setPayload(null);
    axios.get('/api/roles', { params: { q: query, page } }).then(({ data }) => setPayload(data)).catch(() => dispatch(pushNotification({ type: 'error', message: 'Failed to load roles.' })));
  };

  useEffect(() => { load(); }, [query, page]);

  const createRole = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      await axios.post('/api/roles', { name });
      setName('');
      dispatch(pushNotification({ type: 'success', message: 'Role created.' }));
      load();
    } finally { setLoading(false); }
  };

  const removeRole = async (role) => {
    if (!window.confirm(`Delete role ${role.name}?`)) return;
    setLoading(true);
    try {
      await axios.delete(`/api/roles/${role.id}`);
      dispatch(pushNotification({ type: 'success', message: 'Role deleted.' }));
      load();
    } finally { setLoading(false); }
  };

  const syncRolePermissions = async () => {
    if (!modalRole) return;
    setLoading(true);
    try {
      await axios.post(`/api/roles/${modalRole.id}/permissions`, { permissions });
      dispatch(pushNotification({ type: 'success', message: 'Role permissions updated.' }));
      setModalRole(null);
    } finally { setLoading(false); }
  };

  return (
    <AppLayout title="Roles">
      <div className="mb-4 rounded border bg-white p-4">
        <div className="mb-2 font-semibold">Create Role</div>
        <div className="flex gap-2">
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded border px-3 py-2" placeholder="Role name" />
          <button disabled={loading} onClick={createRole} className="rounded border px-3 py-2 disabled:opacity-60">{loading ? 'Saving...' : 'Create'}</button>
        </div>
      </div>
      <div className="mb-4 flex gap-2">
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded border px-3 py-2" placeholder="Search roles" />
      </div>
      {!payload ? <div className="h-16 animate-pulse rounded bg-slate-200" /> : (
        <div className="rounded border bg-white p-2">
          {payload.data.map((role) => (
            <div key={role.id} className="flex items-center justify-between border-b p-2 text-sm last:border-b-0">
              <span>{role.name}</span>
              <div className="space-x-2">
                <button onClick={() => setModalRole(role)} className="rounded border px-2 py-1">Manage Permissions</button>
                <button onClick={() => removeRole(role)} className="rounded border border-red-300 px-2 py-1 text-red-700">Delete</button>
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

      {modalRole ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded bg-white p-4 shadow">
            <h3 className="mb-2 font-semibold">Manage Permissions: {modalRole.name}</h3>
            {['query ai', 'manage users', 'view analytics', 'manage roles', 'manage permissions'].map((perm) => (
              <label key={perm} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={permissions.includes(perm)} onChange={(e) => setPermissions((prev) => e.target.checked ? [...new Set([...prev, perm])] : prev.filter((p) => p !== perm))} />
                {perm}
              </label>
            ))}
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setModalRole(null)} className="rounded border px-3 py-2">Cancel</button>
              <button disabled={loading} onClick={syncRolePermissions} className="rounded border bg-slate-900 px-3 py-2 text-white disabled:opacity-60">{loading ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        </div>
      ) : null}
    </AppLayout>
  );
}
