import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useDispatch } from 'react-redux';
import { pushNotification } from '@/store/slices/notificationSlice';
import { enterpriseApi } from '@/services/api/enterpriseApi';
import Button from '@/Components/UI/Button';
import Skeleton from '@/Components/UI/Skeleton';
import Alert from '@/Components/UI/Alert';
import { can } from '@/services/authz';

export default function SettingsIndex() {
  const inertiaPage = usePage();
  const canManage = can(inertiaPage.props, 'manage settings');
  const [settings, setSettings] = useState(null);
  const [activeTab, setActiveTab] = useState('config');
  const [form, setForm] = useState({ ai_provider: 'ollama', vector_driver: 'meilisearch', rag_top_k: 5, active_vector_db: 'meilisearch', llm_provider: 'ollama' });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const dispatch = useDispatch();

  const load = () => {
    enterpriseApi.getSettings()
      .then((data) => {
        setSettings(data);
        setForm({
          ai_provider: data.ai_provider,
          vector_driver: data.vector_driver,
          rag_top_k: data.rag_top_k || 5,
          active_vector_db: data.active_vector_db || 'meilisearch',
          llm_provider: data.llm_provider || 'ollama',
        });
      })
      .catch(() => setError('Unable to load settings.'));
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!form.active_vector_db || !form.llm_provider) {
      dispatch(pushNotification({ type: 'error', message: 'Please complete vector DB and LLM selections.' }));
      return;
    }

    setSaving(true);
    try {
      await enterpriseApi.updateSettings(form);
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
      <div className="mb-3 flex flex-wrap gap-2">
        {['config', 'llm', 'vectordb', 'drivers', 'campaigns', 'payment'].map((tab) => (
          <Button key={tab} variant={activeTab === tab ? 'primary' : 'info'} onClick={() => setActiveTab(tab)}>
            {tab === 'vectordb' ? 'VectorDB' : tab === 'llm' ? 'LLM' : tab === 'payment' ? 'Payment/Plan' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </div>

      <div className="rounded border bg-white p-4">
        <h2 className="mb-2 text-lg font-semibold">AI / Vector Runtime Configuration</h2>
        {error ? <Alert>{error}</Alert> : null}
        {!settings && !error ? (
          <Skeleton className="h-16" />
        ) : settings ? (
          <form className="grid gap-2 text-sm md:grid-cols-2" onSubmit={(e) => { e.preventDefault(); save(); }}>
            {activeTab === 'config' ? (
              <>
                <label className="grid gap-1">AI SDK Provider
                  <select value={form.ai_provider} onChange={(e) => setForm((f) => ({ ...f, ai_provider: e.target.value }))} className="rounded border px-3 py-2">
                    <option value="ollama">Ollama</option>
                    <option value="openai">OpenAI</option>
                  </select>
                </label>
                <label className="grid gap-1">Vector Driver
                  <select value={form.vector_driver} onChange={(e) => setForm((f) => ({ ...f, vector_driver: e.target.value }))} className="rounded border px-3 py-2">
                    <option value="meilisearch">Meilisearch</option>
                    <option value="database">Database</option>
                    <option value="redis">Redis</option>
                  </select>
                </label>
                <label className="grid gap-1">Active Vector DB
                  <select value={form.active_vector_db} onChange={(e) => setForm((f) => ({ ...f, active_vector_db: e.target.value }))} className="rounded border px-3 py-2">
                    {(settings.available_vector_dbs || []).map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </label>
                <label className="grid gap-1">LLM Provider
                  <select value={form.llm_provider} onChange={(e) => setForm((f) => ({ ...f, llm_provider: e.target.value }))} className="rounded border px-3 py-2">
                    {(settings.available_llms || []).map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </label>
              </>
            ) : ['llm', 'vectordb', 'drivers', 'campaigns'].includes(activeTab) ? (
              <>
                <label className="grid gap-1">RAG Top K
                  <input type="number" min="1" max="20" value={form.rag_top_k} onChange={(e) => setForm((f) => ({ ...f, rag_top_k: Number(e.target.value) }))} className="rounded border px-3 py-2" />
                </label>
                <div>Ollama Endpoint: <strong>{settings.ollama_endpoint}</strong></div>
                <div>Meilisearch Host: <strong>{settings.meilisearch_host}</strong></div>
                <div>Redis Host: <strong>{settings.redis_host}</strong></div>
                <div>DB Connection: <strong>{settings.db_connection}</strong></div>
              </>
            ) : (
              <div className="col-span-full rounded border border-blue-200 bg-blue-50 p-3 text-sm">
                Manage plan pricing, current subscription, and payment provider workflows in the Subscription page.
                <a href="/subscription" className="ml-2 font-semibold text-blue-700 underline">Open Subscription Management</a>
              </div>
            )}

            {canManage ? <Button loading={saving} type="submit" className="col-span-full">Save Settings</Button> : null}
          </form>
        ) : null}
      </div>
    </AppLayout>
  );
}
