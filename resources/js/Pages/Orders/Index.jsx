import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import OrdersTable from '@/Components/OrdersTable';
import AnimatedBarChart from '@/Components/AnimatedBarChart';
import AppLayout from '@/Layouts/AppLayout';

export default function OrdersIndex() {
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    setPayload(null);
    axios.get('/api/orders', { params: { status, page } }).then(({ data }) => setPayload(data));
  }, [status, page]);

  const total = useMemo(() => (payload?.data || []).reduce((sum, o) => sum + Number(o.total), 0), [payload]);

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
          <AnimatedBarChart data={[{ label: 'Orders on Page', value: payload?.data?.length || 0 }, { label: 'Total/100', value: Math.round(total / 100) }]} />
        </div>
      </div>
      {!payload ? <div className="h-16 animate-pulse rounded bg-slate-200" /> : <OrdersTable orders={payload.data} />}
      <div className="mt-3 flex gap-2">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="rounded border px-3 py-1">Prev</button>
        <span className="text-sm">Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)} className="rounded border px-3 py-1">Next</button>
      </div>
    </AppLayout>
  );
}
