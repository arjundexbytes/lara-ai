import React, { useEffect, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { useDispatch } from 'react-redux';
import { pushNotification } from '@/store/slices/notificationSlice';
import { enterpriseApi } from '@/services/api/enterpriseApi';
import Button from '@/Components/UI/Button';
import Modal from '@/Components/UI/Modal';
import Skeleton from '@/Components/UI/Skeleton';

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
    enterpriseApi.getRoles({ q: query, page }).then((data) => setPayload(data)).catch(() => dispatch(pushNotification({ type: 'error', message: 'Failed to load roles.' })));
  };

  useEffect(() => { load(); }, [query, page]);

  const createRole = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      await enterpriseApi.createRole(name);
      setName('');
      dispatch(pushNotification({ type: 'success', message: 'Role created.' }));
      load();
    } finally { setLoading(false); }
  };

  const removeRole = async (role) => {
    setLoading(true);
    try {
      await enterpriseApi.deleteRole(role.id);
      dispatch(pushNotification({ type: 'success', message: 'Role deleted.' }));
      load();
    } finally { setLoading(false); }
  };

  const syncRolePermissions = async () => {
    if (!modalRole) return;
    setLoading(true);
    try {
      await enterpriseApi.syncRolePermissions(modalRole.id, permissions);
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
          <Button loading={loading} onClick={createRole}>Create</Button>
        </div>
      </div>
      <div className="mb-4 flex gap-2">
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded border px-3 py-2" placeholder="Search roles" />
      </div>
      {!payload ? <Skeleton /> : (
        <div className="rounded border bg-white p-2">
          {payload.data.map((role) => (
            <div key={role.id} className="flex items-center justify-between border-b p-2 text-sm last:border-b-0">
              <span>{role.name}</span>
              <div className="space-x-2">
                <Button variant="info" onClick={() => setModalRole(role)}>Manage Permissions</Button>
                <Button variant="danger" onClick={() => removeRole(role)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-3 flex gap-2">
        <Button variant="info" onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</Button>
        <span className="px-2 py-2 text-sm">Page {page}</span>
        <Button variant="info" onClick={() => setPage((p) => p + 1)}>Next</Button>
      </div>

      <Modal
        open={Boolean(modalRole)}
        title={`Manage Permissions: ${modalRole?.name || ''}`}
        onClose={() => setModalRole(null)}
        footer={(
          <>
            <Button variant="warning" onClick={() => setModalRole(null)}>Cancel</Button>
            <Button loading={loading} onClick={syncRolePermissions}>Save</Button>
          </>
        )}
      >
        {['query ai', 'manage users', 'view analytics', 'manage roles', 'manage permissions', 'manage settings'].map((perm) => (
          <label key={perm} className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={permissions.includes(perm)} onChange={(e) => setPermissions((prev) => e.target.checked ? [...new Set([...prev, perm])] : prev.filter((p) => p !== perm))} />
            {perm}
          </label>
        ))}
      </Modal>
    </AppLayout>
  );
}
