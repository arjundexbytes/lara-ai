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
  const [form, setForm] = useState({ name: '', email: '', role: 'analyst' });

  useEffect(() => {
    setPayload(null);
    axios.get('/api/users', { params: { q: query, page } }).then(({ data }) => setPayload(data));
  }, [query, page]);

  useEffect(() => {
    axios.get('/api/analytics').then(({ data }) => setAnalytics(data));
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
        <form onSubmit={onSubmit} className="rounded border bg-white p-4 space-y-2">
          <div className="font-semibold">Create User (UI scaffold)</div>
          <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full rounded border px-3 py-2" placeholder="Full name" />
          <input value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="w-full rounded border px-3 py-2" placeholder="Email" />
          <select value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} className="w-full rounded border px-3 py-2">
            <option value="admin">Admin</option><option value="manager">Manager</option><option value="analyst">Analyst</option>
          </select>
          <button className="rounded border px-3 py-2">Save</button>
        </form>
        <div className="rounded border bg-white p-4">
          <div className="mb-2 font-semibold">Role Analytics</div>
          {analytics ? <AnimatedBarChart data={chartData} /> : <div className="h-20 animate-pulse rounded bg-slate-200" />}
        </div>
      </div>

      <div className="mb-4 flex gap-2">
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded border px-3 py-2" placeholder="Search users" />
      </div>
      {!payload ? <div className="h-16 animate-pulse rounded bg-slate-200" /> : <UsersTable users={payload.data} />}
      <div className="mt-3 flex gap-2">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="rounded border px-3 py-1">Prev</button>
        <span className="text-sm">Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)} className="rounded border px-3 py-1">Next</button>
      </div>
    </AppLayout>
  );
}
