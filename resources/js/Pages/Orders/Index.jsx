import React from 'react';
import { useSelector } from 'react-redux';
import OrdersTable from '@/Components/OrdersTable';
import AppLayout from '@/Layouts/AppLayout';

export default function OrdersIndex() {
  const orders = useSelector((state) => state.entities.orders);
  const aggregate = orders.reduce((sum, item) => sum + Number(item.total), 0);

  return (
    <AppLayout title="Orders">
      <div className="mb-4 rounded border bg-white p-4 text-sm text-slate-600">
        Aggregate total: <strong>${aggregate.toFixed(2)}</strong>
      </div>
      <OrdersTable orders={orders} />
    </AppLayout>
  );
}
