import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ConnectionStatusButton from '@/Components/Status/ConnectionStatusButton';

export default function SettingsIndex() {
  return (
    <AppLayout title="Settings">
      <div className="space-y-4">
        <div className="rounded border bg-white p-4">
          <h2 className="mb-2 text-lg font-semibold">System Configuration</h2>
          <p className="text-sm text-slate-600">Configure AI endpoints, API keys, model IDs, and deployment toggles.</p>
        </div>
        <div className="rounded border bg-white p-4">
          <h2 className="mb-2 text-lg font-semibold">Connection Status</h2>
          <ConnectionStatusButton />
        </div>
      </div>
    </AppLayout>
  );
}
