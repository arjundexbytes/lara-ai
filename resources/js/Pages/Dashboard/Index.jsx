import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ConnectionStatusButton from '@/Components/Status/ConnectionStatusButton';

export default function DashboardIndex() {
  return (
    <AppLayout title="Enterprise Dashboard">
      <div className="mb-4 rounded-lg border bg-white p-4">
        <ConnectionStatusButton />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-white p-4">Aggregate Revenue Chart</div>
        <div className="rounded-lg border bg-white p-4">AI Usage & Cost per Request</div>
        <div className="rounded-lg border bg-white p-4">DB/Redis/AI Health Timeline</div>
      </div>
    </AppLayout>
  );
}
