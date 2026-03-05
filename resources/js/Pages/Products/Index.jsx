import React, { useEffect, useState } from 'react';
import ProductsTable from '@/Components/ProductsTable';
import AnimatedBarChart from '@/Components/AnimatedBarChart';
import AppLayout from '@/Layouts/AppLayout';
import { enterpriseApi } from '@/services/api/enterpriseApi';
import Skeleton from '@/Components/UI/Skeleton';
import Alert from '@/Components/UI/Alert';
import Button from '@/Components/UI/Button';

export default function ProductsIndex() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [payload, setPayload] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    setPayload(null);
    setError('');
    enterpriseApi.getProducts({ q: query, page })
      .then((data) => mounted && setPayload(data))
      .catch(() => mounted && setError('Failed to load products.'));
    return () => { mounted = false; };
  }, [query, page]);

  useEffect(() => {
    let mounted = true;
    enterpriseApi.getAnalytics().then((data) => mounted && setAnalytics(data)).catch(() => null);
    return () => { mounted = false; };
  }, []);

  const chartData = Object.entries(analytics?.product_categories || {}).map(([label, value]) => ({ label, value }));

  return (
    <AppLayout title="Products">
      <div className="mb-4 grid gap-3 md:grid-cols-2">
        <div className="rounded border bg-white p-4">
          <div className="mb-2 font-semibold">Category Analytics</div>
          {analytics ? <AnimatedBarChart data={chartData} /> : <Skeleton className="h-20" />}
        </div>
        <div className="rounded border bg-white p-4">
          <div className="font-semibold">Product CRUD UI scaffold</div>
          <p className="text-sm text-slate-600">Use API endpoints to implement create/update/delete workflows.</p>
        </div>
      </div>
      <div className="mb-4 flex gap-2">
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded border px-3 py-2" placeholder="Search products" />
      </div>
      {error ? <Alert>{error}</Alert> : null}
      {!payload && !error ? <Skeleton /> : <ProductsTable products={payload?.data || []} />}
      <div className="mt-3 flex gap-2">
        <Button variant="info" onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</Button>
        <span className="text-sm">Page {page}</span>
        <Button variant="info" onClick={() => setPage((p) => p + 1)}>Next</Button>
      </div>
    </AppLayout>
  );
}
