import React, { useEffect, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { enterpriseApi } from '@/services/api/enterpriseApi';
import Skeleton from '@/Components/UI/Skeleton';
import Alert from '@/Components/UI/Alert';

export default function UserProfile({ id }) {
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    enterpriseApi.getUserProfile(id).then((data) => setPayload(data)).catch(() => setError('Failed to load user profile.'));
  }, [id]);

  if (!payload && !error) {
    return <AppLayout title="User Profile"><Skeleton className="h-24" /></AppLayout>;
  }

  if (error) {
    return <AppLayout title="User Profile"><Alert>{error}</Alert></AppLayout>;
  }

  return (
    <AppLayout title={`User Profile: ${payload.user.name}`}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded border bg-white p-4 text-sm">
          <div><strong>Email:</strong> {payload.user.email}</div>
          <div><strong>Roles:</strong> {(payload.user.roles || []).map((r) => r.name).join(', ')}</div>
        </div>
        <div className="rounded border bg-white p-4 text-sm">
          <div><strong>Permissions:</strong> {(payload.user.permissions || []).map((p) => p.name).join(', ')}</div>
        </div>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded border bg-white p-4"><h3 className="font-semibold mb-2">Products</h3>{(payload.products?.data || []).map((p) => <div key={p.id} className="text-sm">{p.name}</div>)}</div>
        <div className="rounded border bg-white p-4"><h3 className="font-semibold mb-2">Orders</h3>{(payload.orders?.data || []).map((o) => <div key={o.id} className="text-sm">#{o.id} {o.status} ${o.total}</div>)}</div>
        <div className="rounded border bg-white p-4"><h3 className="font-semibold mb-2">Chat History</h3>{(payload.chats?.data || []).map((c) => <div key={c.id} className="text-sm">{c.role}: {c.message}</div>)}</div>
      </div>
    </AppLayout>
  );
}
