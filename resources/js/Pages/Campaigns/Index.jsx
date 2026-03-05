import React, { useEffect, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { enterpriseApi } from '@/services/api/enterpriseApi';
import Button from '@/Components/UI/Button';
import Modal from '@/Components/UI/Modal';
import Skeleton from '@/Components/UI/Skeleton';
import Alert from '@/Components/UI/Alert';
import { useDispatch } from 'react-redux';
import { pushNotification } from '@/store/slices/notificationSlice';

const initial = { name: '', status: 'draft', description: '' };

export default function CampaignsIndex() {
  const [payload, setPayload] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const load = () => {
    setPayload(null);
    enterpriseApi.getCampaigns({ q: query, page }).then((data) => setPayload(data)).catch(() => setError('Failed to load campaigns.'));
  };

  useEffect(() => { load(); }, [query, page]);

  const save = async () => {
    setLoading(true);
    try {
      if (editing) await enterpriseApi.updateCampaign(editing.id, { ...form, metadata: {} });
      else await enterpriseApi.createCampaign({ ...form, metadata: {} });
      dispatch(pushNotification({ type: 'success', message: 'Campaign saved.' }));
      setModalOpen(false);
      setEditing(null);
      setForm(initial);
      load();
    } catch {
      dispatch(pushNotification({ type: 'error', message: 'Campaign save failed.' }));
    } finally {
      setLoading(false);
    }
  };

  const remove = async (item) => {
    setLoading(true);
    try {
      await enterpriseApi.deleteCampaign(item.id);
      dispatch(pushNotification({ type: 'success', message: 'Campaign deleted.' }));
      load();
    } catch {
      dispatch(pushNotification({ type: 'error', message: 'Campaign delete failed.' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout title="Campaigns">
      <div className="mb-3 flex gap-2">
        <input className="w-full rounded border px-3 py-2" placeholder="Search campaigns" value={query} onChange={(e) => setQuery(e.target.value)} />
        <Button onClick={() => { setModalOpen(true); setEditing(null); setForm(initial); }}>New Campaign</Button>
      </div>

      {error ? <Alert>{error}</Alert> : null}
      {!payload && !error ? <Skeleton className="h-16" /> : (
        <div className="rounded border bg-white p-2">
          {(payload?.data || []).map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b p-2 text-sm last:border-b-0">
              <div>
                <div className="font-semibold">{item.name}</div>
                <div className="text-slate-500">{item.status}</div>
              </div>
              <div className="space-x-2">
                <Button variant="info" onClick={() => { setEditing(item); setForm({ name: item.name, status: item.status, description: item.description || '' }); setModalOpen(true); }}>Edit</Button>
                <Button variant="danger" loading={loading} onClick={() => remove(item)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 flex gap-2">
        <Button variant="info" onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</Button>
        <span className="px-2 py-2 text-sm">Page {page}</span>
        <Button variant="info" onClick={() => setPage((p) => p + 1)}>Next</Button>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Campaign' : 'Create Campaign'} footer={(
        <>
          <Button variant="warning" onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button loading={loading} onClick={save}>Save</Button>
        </>
      )}>
        <div className="space-y-2">
          <input className="w-full rounded border px-3 py-2" placeholder="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          <select className="w-full rounded border px-3 py-2" value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}>
            <option value="draft">draft</option>
            <option value="scheduled">scheduled</option>
            <option value="active">active</option>
            <option value="paused">paused</option>
            <option value="completed">completed</option>
          </select>
          <textarea className="w-full rounded border px-3 py-2" placeholder="Description" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
        </div>
      </Modal>
    </AppLayout>
  );
}
