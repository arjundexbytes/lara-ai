import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import OrdersTable from '@/Components/OrdersTable';

export default function OrdersIndex() {
  return (
    <AppLayout title="Orders">
      <div className="mb-4 rounded border bg-white p-4 text-sm text-slate-600">
        Includes aggregate totals, order detail drill-down, and date-range analytics hooks.
      </div>
      <OrdersTable orders={[]} />
    </AppLayout>
  );
}
