import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ConnectionStatusButton from '@/Components/Status/ConnectionStatusButton';
import AnimatedBarChart from '@/Components/AnimatedBarChart';
import AppLayout from '@/Layouts/AppLayout';

export default function DashboardIndex() {
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    axios
      .get('/api/dashboard/metrics')
      .then(({ data }) => {
        if (mounted) setPayload(data);
      })
      .catch(() => {
        if (mounted) setError('Unable to load dashboard metrics.');
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (!payload && !error) {
    return (
      <AppLayout title="Enterprise Dashboard">
        <div className="space-y-3">
          <div className="h-20 animate-pulse rounded bg-slate-200" />
          <div className="h-40 animate-pulse rounded bg-slate-200" />
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout title="Enterprise Dashboard">
        <div className="rounded border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
      </AppLayout>
    );
  }

  const chartData = [
    { label: 'AI Requests Today', value: payload.metrics.ai_requests_today },
    { label: 'Avg Latency (scaled)', value: Math.round(payload.metrics.avg_ai_latency_ms / 10) },
    { label: 'Error Rate %', value: Math.round(payload.metrics.error_rate * 100) },
  ];

  return (
    <AppLayout title="Enterprise Dashboard">
      <div className="mb-4 rounded-lg border bg-white p-4">
        <ConnectionStatusButton />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-white p-4 transition hover:shadow">
          <h3 className="mb-3 font-semibold">System Monitoring</h3>
          <AnimatedBarChart data={chartData} />
        </div>
        <div className="rounded-lg border bg-white p-4 transition hover:shadow">
          <h3 className="mb-2 font-semibold">Latest 5 Orders</h3>
          <ul className="space-y-1 text-sm">
            {payload.latest_orders.map((o) => <li key={o.id}>#{o.id} • {o.status} • ${o.total}</li>)}
          </ul>
        </div>
        <div className="rounded-lg border bg-white p-4 transition hover:shadow">
          <h3 className="mb-2 font-semibold">Latest Chat</h3>
          <ul className="space-y-1 text-sm">
            {payload.latest_chat.map((m, i) => <li key={i}>{m.role}: {m.message.slice(0, 40)}...</li>)}
          </ul>
        </div>
      </div>
    </AppLayout>
  );
}
