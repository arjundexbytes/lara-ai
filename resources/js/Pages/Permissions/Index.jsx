import React, { useEffect, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { useDispatch } from 'react-redux';
import { pushNotification } from '@/store/slices/notificationSlice';
import { enterpriseApi } from '@/services/api/enterpriseApi';
import Button from '@/Components/UI/Button';
import Skeleton from '@/Components/UI/Skeleton';

export default function PermissionsIndex() {
  const [payload, setPayload] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const load = () => {
    setPayload(null);
    enterpriseApi.getPermissions({ q: query, page }).then((data) => setPayload(data)).catch(() => dispatch(pushNotification({ type: 'error', message: 'Failed to load permissions.' })));
  };

  useEffect(() => { load(); }, [query, page]);

  const createPermission = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      await enterpriseApi.createPermission(name);
      setName('');
      dispatch(pushNotification({ type: 'success', message: 'Permission created.' }));
      load();
    } finally { setLoading(false); }
  };

  const removePermission = async (permission) => {
    setLoading(true);
    try {
      await enterpriseApi.deletePermission(permission.id);
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
          <Button loading={loading} onClick={createPermission}>Create</Button>
        </div>
      </div>
      <div className="mb-4 flex gap-2">
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded border px-3 py-2" placeholder="Search permissions" />
      </div>
      {!payload ? <Skeleton /> : (
        <div className="rounded border bg-white p-2">
          {payload.data.map((permission) => (
            <div key={permission.id} className="flex items-center justify-between border-b p-2 text-sm last:border-b-0">
              <span>{permission.name}</span>
              <div className="space-x-2">
                <Button variant="info">Edit</Button>
                <Button variant="danger" onClick={() => removePermission(permission)}>Delete</Button>
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
    </AppLayout>
  );
}
