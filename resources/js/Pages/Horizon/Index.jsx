import React, { useEffect, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { enterpriseApi } from '@/services/api/enterpriseApi';
import Skeleton from '@/Components/UI/Skeleton';
import Alert from '@/Components/UI/Alert';
import AnimatedBarChart from '@/Components/AnimatedBarChart';

export default function HorizonIndex() {
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    enterpriseApi.getHorizonMetrics().then((data) => setPayload(data)).catch(() => setError('Failed to load horizon metrics.'));
  }, []);

  const cards = [
    ['Pending Jobs', payload?.queues?.pending_jobs || 0],
    ['Failed Jobs', payload?.queues?.failed_jobs || 0],
    ['Processed Today', payload?.queues?.processed_today || 0],
    ['Throughput/min', payload?.queues?.throughput_per_min || 0],
  ];

  return (
    <AppLayout title="Horizon">
      {error ? <Alert>{error}</Alert> : null}
      {!payload && !error ? <Skeleton className="h-24" /> : (
        <>
          <div className="grid gap-3 md:grid-cols-4">
            {cards.map(([label, value]) => (
              <div key={label} className="rounded border bg-white p-4 transition hover:shadow">
                <div className="text-sm text-slate-500">{label}</div>
                <div className="text-2xl font-semibold">{value}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded border bg-white p-4">
            <AnimatedBarChart data={cards.map(([label, value]) => ({ label, value }))} />
          </div>
        </>
      )}
    </AppLayout>
  );
}
