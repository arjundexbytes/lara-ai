import React, { useMemo, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { enterpriseApi } from '@/services/api/enterpriseApi';
import Skeleton from '@/Components/UI/Skeleton';
import Alert from '@/Components/UI/Alert';
import Button from '@/Components/UI/Button';

const tabs = ['profile', 'products', 'orders', 'chat', 'documents'];

export default function UserProfile({ id }) {
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('profile');
  const [search, setSearch] = useState('');

  React.useEffect(() => {
    enterpriseApi.getUserProfile(id).then((data) => setPayload(data)).catch(() => setError('Failed to load user profile.'));
  }, [id]);

  const filtered = useMemo(() => {
    if (!payload) return [];
    const q = search.trim().toLowerCase();

    const source = tab === 'products'
      ? (payload.products?.data || [])
      : tab === 'orders'
        ? (payload.orders?.data || [])
        : tab === 'chat'
          ? (payload.chats?.data || [])
          : tab === 'documents'
            ? (payload.documents?.data || [])
            : [];

    if (!q) return source;

    return source.filter((row) => JSON.stringify(row).toLowerCase().includes(q));
  }, [payload, search, tab]);

  if (!payload && !error) {
    return <AppLayout title="User Profile"><Skeleton className="h-24" /></AppLayout>;
  }

  if (error) {
    return <AppLayout title="User Profile"><Alert>{error}</Alert></AppLayout>;
  }

  return (
    <AppLayout title={`User Profile: ${payload.user.name}`}>
      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <div className="rounded border bg-white p-4 text-sm">
          <div><strong>Email:</strong> {payload.user.email}</div>
          <div><strong>Roles:</strong> {(payload.user.roles || []).map((r) => r.name).join(', ')}</div>
        </div>
        <div className="rounded border bg-white p-4 text-sm">
          <div><strong>Permissions:</strong> {(payload.user.permissions || []).map((p) => p.name).join(', ')}</div>
        </div>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        {tabs.map((item) => (
          <Button key={item} variant={tab === item ? 'primary' : 'info'} onClick={() => setTab(item)}>{item}</Button>
        ))}
      </div>

      {tab !== 'profile' ? (
        <div className="mb-3">
          <input value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded border px-3 py-2" placeholder={`Search ${tab}`} />
        </div>
      ) : null}

      {tab === 'profile' ? (
        <div className="rounded border bg-white p-4 text-sm">Profile overview with role and permission summary is shown above.</div>
      ) : (
        <div className="rounded border bg-white p-4">
          <div className="mb-2 text-sm font-semibold capitalize">{tab}</div>
          <div className="space-y-2 text-sm">
            {filtered.map((row) => (
              <div key={`${tab}-${row.id}`} className="rounded border p-2">{JSON.stringify(row)}</div>
            ))}
            {!filtered.length ? <div className="text-slate-500">No records found.</div> : null}
          </div>
        </div>
      )}
    </AppLayout>
  );
}
