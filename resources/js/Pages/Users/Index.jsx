import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import UsersTable from '@/Components/UsersTable';
import AppLayout from '@/Layouts/AppLayout';

export default function UsersIndex() {
  const users = useSelector((state) => state.entities.users);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => users.filter((u) => `${u.name} ${u.email} ${u.role}`.toLowerCase().includes(query.toLowerCase())), [users, query]);

  return (
    <AppLayout title="Users">
      <div className="mb-4 flex gap-2">
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded border px-3 py-2" placeholder="Vector search users" />
        <button className="rounded border px-3 py-2">Add User</button>
      </div>
      <UsersTable users={filtered} />
    </AppLayout>
  );
}
