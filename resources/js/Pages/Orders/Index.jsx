import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import OrdersTable from '@/Components/OrdersTable';
import AnimatedBarChart from '@/Components/AnimatedBarChart';
import AppLayout from '@/Layouts/AppLayout';

export default function OrdersIndex() {
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [payload, setPayload] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    setPayload(null);
    setError('');
    axios.get('/api/orders', { params: { status, page } })
      .then(({ data }) => mounted && setPayload(data))
      .catch(() => mounted && setError('Failed to load orders.'));
    return () => { mounted = false; };
  }, [status, page]);

  useEffect(() => {
    let mounted = true;
    axios.get('/api/analytics').then(({ data }) => mounted && setAnalytics(data)).catch(() => null);
    return () => { mounted = false; };
  }, []);

  const total = useMemo(() => (payload?.data || []).reduce((sum, o) => sum + Number(o.total), 0), [payload]);
  const chartData = Object.entries(analytics?.orders_by_status || {}).map(([label, value]) => ({ label, value }));

  return (
    <AppLayout title="Orders">
      <div className="mb-4 grid gap-3 md:grid-cols-2">
        <div className="rounded border bg-white p-4">
          <div className="mb-2 text-sm">Aggregate total: <strong>${total.toFixed(2)}</strong></div>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded border px-3 py-2 text-sm">
            <option value="">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="processing">Processing</option>
          </select>
        </div>
        <div className="rounded border bg-white p-4">
          {analytics ? <AnimatedBarChart data={chartData} /> : <div className="h-20 animate-pulse rounded bg-slate-200" />}
        </div>
      </div>
      {error ? <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div> : null}
      {!payload && !error ? <div className="h-16 animate-pulse rounded bg-slate-200" /> : <OrdersTable orders={payload?.data || []} />}
      <div className="mt-3 flex gap-2">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="rounded border px-3 py-1">Prev</button>
        <span className="text-sm">Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)} className="rounded border px-3 py-1">Next</button>
      </div>
    </AppLayout>
  );
}
