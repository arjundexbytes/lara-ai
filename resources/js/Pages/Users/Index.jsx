import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import UsersTable from '@/Components/UsersTable';

export default function UsersIndex() {
  return (
    <AppLayout title="Users">
      <div className="mb-4 rounded border bg-white p-4 text-sm text-slate-600">Vector search and role CRUD hooks are scaffolded for enterprise extension.</div>
      <UsersTable users={[]} />
    </AppLayout>
  );
}
