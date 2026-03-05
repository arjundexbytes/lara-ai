import React, { useEffect, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { enterpriseApi } from '@/services/api/enterpriseApi';
import Skeleton from '@/Components/UI/Skeleton';
import Alert from '@/Components/UI/Alert';
import Button from '@/Components/UI/Button';

export default function DocumentsIndex() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError('');
    enterpriseApi.getDocuments({ file_type: type })
      .then((data) => {
        if (mounted) setItems(data.data || []);
      })
      .catch(() => {
        if (mounted) setError('Failed to load documents.');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [type]);

  return (
    <AppLayout title="Documents">
      <div className="mb-4 flex gap-2">
        <select value={type} onChange={(e) => setType(e.target.value)} className="rounded border px-3 py-2">
          <option value="">All</option>
          <option value="document">Document</option>
          <option value="audio">Audio</option>
          <option value="video">Video</option>
        </select>
      </div>

      {loading ? (
        <div className="space-y-2">
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
        </div>
      ) : error ? (
        <Alert>{error}</Alert>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {items.map((doc) => (
            <div key={doc.id} className="rounded border bg-white p-4 transition hover:shadow">
              <div className="text-xs uppercase text-slate-500">{doc.file_type}</div>
              <div className="font-semibold">{doc.title}</div>
              <p className="mt-1 text-sm text-slate-600">{doc.content}</p>
              <Button className="mt-3" variant="info">AI Summarize</Button>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );
}
