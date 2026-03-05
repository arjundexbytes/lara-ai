import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UsersTable from '@/Components/UsersTable';
import AnimatedBarChart from '@/Components/AnimatedBarChart';
import AppLayout from '@/Layouts/AppLayout';
import { useDispatch } from 'react-redux';
import { pushNotification } from '@/store/slices/notificationSlice';

export default function UsersIndex() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [payload, setPayload] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState('');
  const [activeUser, setActiveUser] = useState(null);
  const [selectedPermissions, setSelectedPermissions] = useState(['query ai']);
  const [loadingActionId, setLoadingActionId] = useState(null);
  const dispatch = useDispatch();

  const loadUsers = () => {
    setPayload(null);
    setError('');
    axios.get('/api/users', { params: { q: query, page } })
      .then(({ data }) => setPayload(data))
      .catch(() => setError('Failed to load users.'));
  };

  useEffect(() => { loadUsers(); }, [query, page]);

  useEffect(() => {
    axios.get('/api/analytics').then(({ data }) => setAnalytics(data)).catch(() => null);
  }, []);

  const onDelete = async (user) => {
    if (!window.confirm(`Delete user ${user.name}?`)) return;
    setLoadingActionId(user.id);
    try {
      await axios.delete(`/api/users/${user.id}`);
      dispatch(pushNotification({ type: 'success', message: 'User deleted.' }));
      loadUsers();
    } catch {
      dispatch(pushNotification({ type: 'error', message: 'Delete failed.' }));
    } finally {
      setLoadingActionId(null);
    }
  };

  const submitPermissions = async () => {
    if (!activeUser) return;
    setLoadingActionId(activeUser.id);
    try {
      await axios.post(`/api/users/${activeUser.id}/permissions`, { permissions: selectedPermissions });
      dispatch(pushNotification({ type: 'success', message: 'Permissions updated.' }));
      setActiveUser(null);
      loadUsers();
    } catch {
      dispatch(pushNotification({ type: 'error', message: 'Permission assignment failed.' }));
    } finally {
      setLoadingActionId(null);
    }
  };

  const chartData = Object.entries(analytics?.users_by_role || {}).map(([label, value]) => ({ label, value }));

  return (
    <AppLayout title="Users">
      <div className="mb-4 grid gap-3 md:grid-cols-2">
        <div className="rounded border bg-white p-4">
          <div className="font-semibold">User Management</div>
          <p className="text-sm text-slate-600">Edit/Delete/Assign permissions available per row action.</p>
        </div>
        <div className="rounded border bg-white p-4">
          <div className="mb-2 font-semibold">Role Analytics</div>
          {analytics ? <AnimatedBarChart data={chartData} /> : <div className="h-20 animate-pulse rounded bg-slate-200" />}
        </div>
      </div>

      <div className="mb-4 flex gap-2">
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded border px-3 py-2" placeholder="Search users" />
      </div>
      {error ? <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div> : null}
      {!payload && !error ? (
        <div className="h-16 animate-pulse rounded bg-slate-200" />
      ) : (
        <UsersTable
          users={payload?.data || []}
          loadingActionId={loadingActionId}
          onDelete={onDelete}
          onAssignPermissions={(u) => setActiveUser(u)}
        />
      )}
      <div className="mt-3 flex gap-2">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="rounded border px-3 py-1">Prev</button>
        <span className="text-sm">Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)} className="rounded border px-3 py-1">Next</button>
      </div>

      {activeUser ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded bg-white p-4 shadow">
            <h3 className="mb-2 font-semibold">Assign Permissions: {activeUser.name}</h3>
            <div className="space-y-2 text-sm">
              {['query ai', 'manage users', 'view analytics', 'manage roles', 'manage permissions'].map((perm) => (
                <label key={perm} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedPermissions.includes(perm)}
                    onChange={(e) => {
                      setSelectedPermissions((prev) => e.target.checked ? [...new Set([...prev, perm])] : prev.filter((p) => p !== perm));
                    }}
                  />
                  {perm}
                </label>
              ))}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setActiveUser(null)} className="rounded border px-3 py-2">Cancel</button>
              <button disabled={loadingActionId === activeUser.id} onClick={submitPermissions} className="rounded border bg-slate-900 px-3 py-2 text-white disabled:opacity-60">
                {loadingActionId === activeUser.id ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </AppLayout>
  );
}
