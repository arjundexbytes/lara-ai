import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@/src/components/buttons/Button';
import { apiService } from '@/src/api/apiService';

export default function Settings() {
  const [form, setForm] = useState({ ai_provider: 'ollama', vector_driver: 'meilisearch', rag_top_k: 5 });
  const [loading, setLoading] = useState(false);

  const save = async () => {
    setLoading(true);
    try { await apiService.updateSettings(form); } finally { setLoading(false); }
  };

  return <Stack spacing={2}><TextField label="AI Provider" value={form.ai_provider} onChange={(e) => setForm((f) => ({ ...f, ai_provider: e.target.value }))} /><TextField label="Vector Driver" value={form.vector_driver} onChange={(e) => setForm((f) => ({ ...f, vector_driver: e.target.value }))} /><Button loading={loading} onClick={save}>Save</Button></Stack>;
}
