import React, { useEffect, useMemo, useState } from 'react';
import OrdersTable from '@/Components/OrdersTable';
import AnimatedBarChart from '@/Components/AnimatedBarChart';
import AppLayout from '@/Layouts/AppLayout';
import { enterpriseApi } from '@/services/api/enterpriseApi';
import Skeleton from '@/Components/UI/Skeleton';
import Alert from '@/Components/UI/Alert';
import Button from '@/Components/UI/Button';

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
    enterpriseApi.getOrders({ status, page })
      .then((data) => mounted && setPayload(data))
      .catch(() => mounted && setError('Failed to load orders.'));
    return () => { mounted = false; };
  }, [status, page]);

  useEffect(() => {
    let mounted = true;
    enterpriseApi.getAnalytics().then((data) => mounted && setAnalytics(data)).catch(() => null);
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
          {analytics ? <AnimatedBarChart data={chartData} /> : <Skeleton className="h-20" />}
        </div>
      </div>
      {error ? <Alert>{error}</Alert> : null}
      {!payload && !error ? <Skeleton /> : <OrdersTable orders={payload?.data || []} />}
      <div className="mt-3 flex gap-2">
        <Button variant="info" onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</Button>
        <span className="text-sm">Page {page}</span>
        <Button variant="info" onClick={() => setPage((p) => p + 1)}>Next</Button>
      </div>
    </AppLayout>
  );
}
