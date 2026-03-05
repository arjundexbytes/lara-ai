import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductsTable from '@/Components/ProductsTable';
import AnimatedBarChart from '@/Components/AnimatedBarChart';
import AppLayout from '@/Layouts/AppLayout';

export default function ProductsIndex() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [payload, setPayload] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    setPayload(null);
    axios.get('/api/products', { params: { q: query, page } }).then(({ data }) => setPayload(data));
  }, [query, page]);

  useEffect(() => {
    axios.get('/api/analytics').then(({ data }) => setAnalytics(data));
  }, []);

  const chartData = Object.entries(analytics?.product_categories || {}).map(([label, value]) => ({ label, value }));

  return (
    <AppLayout title="Products">
      <div className="mb-4 grid gap-3 md:grid-cols-2">
        <div className="rounded border bg-white p-4">
          <div className="mb-2 font-semibold">Category Analytics</div>
          {analytics ? <AnimatedBarChart data={chartData} /> : <div className="h-20 animate-pulse rounded bg-slate-200" />}
        </div>
        <div className="rounded border bg-white p-4">
          <div className="font-semibold">Product CRUD UI scaffold</div>
          <p className="text-sm text-slate-600">Use API endpoints to implement create/update/delete workflows.</p>
        </div>
      </div>
      <div className="mb-4 flex gap-2">
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded border px-3 py-2" placeholder="Search products" />
      </div>
      {!payload ? <div className="h-16 animate-pulse rounded bg-slate-200" /> : <ProductsTable products={payload.data} />}
      <div className="mt-3 flex gap-2">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="rounded border px-3 py-1">Prev</button>
        <span className="text-sm">Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)} className="rounded border px-3 py-1">Next</button>
      </div>
    </AppLayout>
  );
}
