import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UsersTable from '@/Components/UsersTable';
import AnimatedBarChart from '@/Components/AnimatedBarChart';
import AppLayout from '@/Layouts/AppLayout';

export default function UsersIndex() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [payload, setPayload] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', role: 'analyst' });

  useEffect(() => {
    let mounted = true;
    setPayload(null);
    setError('');
    axios.get('/api/users', { params: { q: query, page } })
      .then(({ data }) => mounted && setPayload(data))
      .catch(() => mounted && setError('Failed to load users.'));

    return () => { mounted = false; };
  }, [query, page]);

  useEffect(() => {
    let mounted = true;
    axios.get('/api/analytics').then(({ data }) => mounted && setAnalytics(data)).catch(() => null);
    return () => { mounted = false; };
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!form.name || !form.email.includes('@')) return;
    setForm({ name: '', email: '', role: 'analyst' });
  };

  const chartData = Object.entries(analytics?.users_by_role || {}).map(([label, value]) => ({ label, value }));

  return (
    <AppLayout title="Users">
      <div className="mb-4 grid gap-3 md:grid-cols-2">
        <form onSubmit={onSubmit} className="space-y-2 rounded border bg-white p-4">
          <div className="font-semibold">Create User (UI scaffold)</div>
          <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full rounded border px-3 py-2" placeholder="Full name" />
          <input value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="w-full rounded border px-3 py-2" placeholder="Email" />
          <select value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} className="w-full rounded border px-3 py-2">
            <option value="admin">Admin</option><option value="manager">Manager</option><option value="analyst">Analyst</option>
          </select>
          <button className="rounded border px-3 py-2 transition hover:bg-slate-100">Save</button>
        </form>
        <div className="rounded border bg-white p-4">
          <div className="mb-2 font-semibold">Role Analytics</div>
          {analytics ? <AnimatedBarChart data={chartData} /> : <div className="h-20 animate-pulse rounded bg-slate-200" />}
        </div>
      </div>

      <div className="mb-4 flex gap-2">
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded border px-3 py-2" placeholder="Search users" />
      </div>
      {error ? <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div> : null}
      {!payload && !error ? <div className="h-16 animate-pulse rounded bg-slate-200" /> : <UsersTable users={payload?.data || []} />}
      <div className="mt-3 flex gap-2">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="rounded border px-3 py-1">Prev</button>
        <span className="text-sm">Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)} className="rounded border px-3 py-1">Next</button>
      </div>
    </AppLayout>
  );
}
