import React, { useEffect, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { enterpriseApi } from '@/services/api/enterpriseApi';
import Skeleton from '@/Components/UI/Skeleton';
import Alert from '@/Components/UI/Alert';
import Badge from '@/Components/UI/Badge';

export default function VectorDatabasesIndex() {
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    enterpriseApi.getVectorDatabases().then((data) => setPayload(data)).catch(() => setError('Failed to load vector databases.'));
  }, []);

  return (
    <AppLayout title="Vector Databases">
      {!payload && !error ? <Skeleton className="h-16" /> : null}
      {error ? <Alert>{error}</Alert> : null}
      {payload ? (
        <div className="grid gap-3 md:grid-cols-2">
          {payload.items.map((item) => (
            <div key={item.name} className="rounded border bg-white p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold">{item.name}</h3>
                <Badge tone={payload.active === item.name ? 'success' : 'info'}>{payload.active === item.name ? 'Active' : 'Available'}</Badge>
              </div>
              <div className="text-sm text-slate-600">Driver: {item.driver}</div>
            </div>
          ))}
        </div>
      ) : null}
    </AppLayout>
  );
}
