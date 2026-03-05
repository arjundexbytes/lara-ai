import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppLayout from '@/Layouts/AppLayout';
import ConnectionStatusButton from '@/Components/Status/ConnectionStatusButton';

export default function SettingsIndex() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    axios.get('/api/settings').then(({ data }) => setSettings(data));
  }, []);

  return (
    <AppLayout title="Settings">
      <div className="space-y-4">
        <div className="rounded border bg-white p-4">
          <h2 className="mb-2 text-lg font-semibold">Connection Status</h2>
          <ConnectionStatusButton />
        </div>

        <div className="rounded border bg-white p-4">
          <h2 className="mb-2 text-lg font-semibold">AI & Vector Providers</h2>
          {!settings ? (
            <div className="h-16 animate-pulse rounded bg-slate-200" />
          ) : (
            <div className="grid gap-2 text-sm">
              <div>AI Provider: <strong>{settings.ai_provider}</strong></div>
              <div>Ollama Endpoint: <strong>{settings.ollama_endpoint}</strong></div>
              <div>Vector Driver: <strong>{settings.vector_driver}</strong></div>
              <div>Meilisearch Host: <strong>{settings.meilisearch_host}</strong></div>
              <div>Redis Host: <strong>{settings.redis_host}</strong></div>
              <div>DB Connection: <strong>{settings.db_connection}</strong></div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
