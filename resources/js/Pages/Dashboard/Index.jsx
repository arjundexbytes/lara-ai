import React from 'react';
import { useSelector } from 'react-redux';
import ConnectionStatusButton from '@/Components/Status/ConnectionStatusButton';
import AppLayout from '@/Layouts/AppLayout';

export default function DashboardIndex() {
  const { users, products, orders } = useSelector((state) => state.entities);

  return (
    <AppLayout title="Enterprise Dashboard">
      <div className="mb-4 rounded-lg border bg-white p-4">
        <ConnectionStatusButton />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-white p-4">Users: {users.length}</div>
        <div className="rounded-lg border bg-white p-4">Products: {products.length}</div>
        <div className="rounded-lg border bg-white p-4">Orders: {orders.length}</div>
      </div>
    </AppLayout>
  );
}
