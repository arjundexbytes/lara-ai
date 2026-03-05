import React, { useEffect, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { enterpriseApi } from '@/services/api/enterpriseApi';
import Skeleton from '@/Components/UI/Skeleton';
import Alert from '@/Components/UI/Alert';
import Button from '@/Components/UI/Button';

function UploadPreview({ item }) {
  if (item.mime_type?.startsWith('image/')) return <img src={item.url} alt={item.name} className="h-24 w-full rounded object-cover" />;
  if (item.mime_type?.startsWith('audio/')) return <audio controls className="w-full" src={item.url} />;
  if (item.mime_type?.startsWith('video/')) return <video controls className="w-full rounded" src={item.url} />;
  return <a className="text-blue-700 underline" href={item.url} target="_blank" rel="noreferrer">Download {item.name}</a>;
}

export default function UploadsIndex() {
  const [payload, setPayload] = useState(null);
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');

  const load = () => {
    setPayload(null);
    enterpriseApi.getUploads({ q: query, type, page }).then((data) => setPayload(data)).catch(() => setError('Failed to load uploads.'));
  };

  useEffect(() => { load(); }, [query, type, page]);

  return (
    <AppLayout title="Uploads">
      <div className="mb-3 grid gap-2 md:grid-cols-2">
        <input className="rounded border px-3 py-2" placeholder="Search files" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select className="rounded border px-3 py-2" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All Types</option>
          <option value="image">Images</option>
          <option value="audio">Audio</option>
          <option value="video">Video</option>
          <option value="application">Documents</option>
        </select>
      </div>
      {error ? <Alert>{error}</Alert> : null}
      {!payload && !error ? <Skeleton className="h-20" /> : (
        <div className="grid gap-3 md:grid-cols-3">
          {(payload?.data || []).map((item) => (
            <div key={item.id} className="rounded border bg-white p-3">
              <div className="mb-2 text-xs text-slate-500">{item.mime_type}</div>
              <div className="mb-2 truncate font-semibold">{item.name}</div>
              <UploadPreview item={item} />
            </div>
          ))}
        </div>
      )}
      <div className="mt-3 flex gap-2">
        <Button variant="info" onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</Button>
        <span className="px-2 py-2 text-sm">Page {page}</span>
        <Button variant="info" onClick={() => setPage((p) => p + 1)}>Next</Button>
      </div>
    </AppLayout>
  );
}
