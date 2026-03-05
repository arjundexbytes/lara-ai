import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppLayout from '@/Layouts/AppLayout';
import ConnectionStatusButton from '@/Components/Status/ConnectionStatusButton';

export default function SettingsIndex() {
  const [settings, setSettings] = useState(null);
  const [form, setForm] = useState({ ai_provider: 'ollama', vector_driver: 'meilisearch' });
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    axios.get('/api/settings')
      .then(({ data }) => {
        if (!mounted) return;
        setSettings(data);
        setForm({ ai_provider: data.ai_provider, vector_driver: data.vector_driver });
      })
      .catch(() => {
        if (mounted) setError('Unable to load settings.');
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AppLayout title="Settings">
      <div className="space-y-4">
        <div className="rounded border bg-white p-4">
          <h2 className="mb-2 text-lg font-semibold">Connection Status</h2>
          <ConnectionStatusButton />
        </div>

        <div className="rounded border bg-white p-4">
          <h2 className="mb-2 text-lg font-semibold">AI / Vector Provider Config</h2>
          {error ? <div className="mb-2 rounded border border-red-200 bg-red-50 p-2 text-sm text-red-700">{error}</div> : null}
          {!settings && !error ? (
            <div className="h-16 animate-pulse rounded bg-slate-200" />
          ) : settings ? (
            <form className="grid gap-2 text-sm md:grid-cols-2">
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
              <div>Ollama Endpoint: <strong>{settings.ollama_endpoint}</strong></div>
              <div>Meilisearch Host: <strong>{settings.meilisearch_host}</strong></div>
              <div>Redis Host: <strong>{settings.redis_host}</strong></div>
              <div>DB Connection: <strong>{settings.db_connection}</strong></div>
              <button type="button" className="col-span-full rounded border px-3 py-2">Save Settings (scaffold)</button>
            </form>
          ) : null}
        </div>
      </div>
    </AppLayout>
  );
}
