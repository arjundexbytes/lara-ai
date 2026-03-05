import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppLayout from '@/Layouts/AppLayout';
import { useDispatch } from 'react-redux';
import { pushNotification } from '@/store/slices/notificationSlice';

export default function SettingsIndex() {
  const [settings, setSettings] = useState(null);
  const [form, setForm] = useState({ ai_provider: 'ollama', vector_driver: 'meilisearch', rag_top_k: 5 });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const dispatch = useDispatch();

  const load = () => {
    axios.get('/api/settings')
      .then(({ data }) => {
        setSettings(data);
        setForm({ ai_provider: data.ai_provider, vector_driver: data.vector_driver, rag_top_k: data.rag_top_k || 5 });
      })
      .catch(() => setError('Unable to load settings.'));
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    setSaving(true);
    try {
      await axios.put('/api/settings', form);
      dispatch(pushNotification({ type: 'success', message: 'Settings saved.' }));
      load();
    } catch {
      dispatch(pushNotification({ type: 'error', message: 'Settings save failed.' }));
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppLayout title="Settings">
      <div className="rounded border bg-white p-4">
        <h2 className="mb-2 text-lg font-semibold">AI / Vector Runtime Configuration</h2>
        {error ? <div className="mb-2 rounded border border-red-200 bg-red-50 p-2 text-sm text-red-700">{error}</div> : null}
        {!settings && !error ? (
          <div className="h-16 animate-pulse rounded bg-slate-200" />
        ) : settings ? (
          <form className="grid gap-2 text-sm md:grid-cols-2" onSubmit={(e) => { e.preventDefault(); save(); }}>
            <label className="grid gap-1">AI Provider
              <select value={form.ai_provider} onChange={(e) => setForm((f) => ({ ...f, ai_provider: e.target.value }))} className="rounded border px-3 py-2">
                <option value="ollama">Ollama</option>
                <option value="openai">OpenAI</option>
              </select>
            </label>
            <label className="grid gap-1">Vector Driver
              <select value={form.vector_driver} onChange={(e) => setForm((f) => ({ ...f, vector_driver: e.target.value }))} className="rounded border px-3 py-2">
                <option value="meilisearch">Meilisearch</option>
                <option value="database">Database</option>
              </select>
            </label>
            <label className="grid gap-1">RAG Top K
              <input type="number" min="1" max="20" value={form.rag_top_k} onChange={(e) => setForm((f) => ({ ...f, rag_top_k: Number(e.target.value) }))} className="rounded border px-3 py-2" />
            </label>
            <div>Ollama Endpoint: <strong>{settings.ollama_endpoint}</strong></div>
            <div>Meilisearch Host: <strong>{settings.meilisearch_host}</strong></div>
            <div>Redis Host: <strong>{settings.redis_host}</strong></div>
            <div>DB Connection: <strong>{settings.db_connection}</strong></div>
            <button disabled={saving} type="submit" className="col-span-full rounded border bg-slate-900 px-3 py-2 text-white disabled:opacity-60">{saving ? 'Saving…' : 'Save Settings'}</button>
          </form>
        ) : null}
      </div>
    </AppLayout>
  );
}
