import React, { useEffect, useState } from 'react';
import UsersTable from '@/Components/UsersTable';
import AnimatedBarChart from '@/Components/AnimatedBarChart';
import AppLayout from '@/Layouts/AppLayout';
import { useDispatch } from 'react-redux';
import { pushNotification } from '@/store/slices/notificationSlice';
import { enterpriseApi } from '@/services/api/enterpriseApi';
import Button from '@/Components/UI/Button';
import Modal from '@/Components/UI/Modal';
import Skeleton from '@/Components/UI/Skeleton';
import Alert from '@/Components/UI/Alert';

export default function UsersIndex() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [payload, setPayload] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState('');
  const [activeUser, setActiveUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [selectedPermissions, setSelectedPermissions] = useState(['query ai']);
  const [loadingActionId, setLoadingActionId] = useState(null);
  const dispatch = useDispatch();

  const loadUsers = () => {
    setPayload(null);
    setError('');
    enterpriseApi.getUsers({ q: query, page })
      .then((data) => setPayload(data))
      .catch(() => setError('Failed to load users.'));
  };

  useEffect(() => { loadUsers(); }, [query, page]);

  useEffect(() => {
    enterpriseApi.getAnalytics().then((data) => setAnalytics(data)).catch(() => null);
  }, []);

  const onDelete = async (user) => {
    setDeletingUser(user);
  };

  const confirmDelete = async () => {
    if (!deletingUser) return;
    setLoadingActionId(deletingUser.id);
    try {
      await enterpriseApi.deleteUser(deletingUser.id);
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
      await enterpriseApi.assignUserPermissions(activeUser.id, selectedPermissions);
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
          {analytics ? <AnimatedBarChart data={chartData} /> : <Skeleton className="h-20" />}
        </div>
      </div>

      <div className="mb-4 flex gap-2">
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded border px-3 py-2" placeholder="Search users" />
      </div>
      {error ? <Alert>{error}</Alert> : null}
      {!payload && !error ? (
        <Skeleton />
      ) : (
        <UsersTable
          users={payload?.data || []}
          loadingActionId={loadingActionId}
          onDelete={onDelete}
          onAssignPermissions={(u) => setActiveUser(u)}
        />
      )}
      <div className="mt-3 flex gap-2">
        <Button variant="info" onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</Button>
        <span className="px-2 py-2 text-sm">Page {page}</span>
        <Button variant="info" onClick={() => setPage((p) => p + 1)}>Next</Button>
      </div>


      <Modal
        open={Boolean(deletingUser)}
        title={`Delete user: ${deletingUser?.name || ''}`}
        onClose={() => setDeletingUser(null)}
        footer={(
          <>
            <Button variant="warning" onClick={() => setDeletingUser(null)}>Cancel</Button>
            <Button variant="danger" loading={loadingActionId === deletingUser?.id} onClick={confirmDelete}>Delete</Button>
          </>
        )}
      >
        <p className="text-sm">This action is destructive and cannot be undone.</p>
      </Modal>

      <Modal
        open={Boolean(activeUser)}
        title={`Assign Permissions: ${activeUser?.name || ''}`}
        onClose={() => setActiveUser(null)}
        footer={(
          <>
            <Button variant="warning" onClick={() => setActiveUser(null)}>Cancel</Button>
            <Button loading={loadingActionId === activeUser?.id} onClick={submitPermissions}>Save</Button>
          </>
        )}
      >
        <div className="space-y-2 text-sm">
          {['query ai', 'manage users', 'view analytics', 'manage roles', 'manage permissions', 'manage settings'].map((perm) => (
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
      </Modal>
    </AppLayout>
  );
}
