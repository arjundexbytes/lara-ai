import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@/src/components/buttons/Button';
import { apiService } from '@/src/api/apiService';
import SettingsTabs from '@/src/components/tabs/SettingsTabs';
import LLMCard from '@/src/components/llm/LLMCard';
import VectorDBCard from '@/src/components/vectordb/VectorDBCard';

export default function Settings() {
  const [tab, setTab] = useState('llm');
  const [form, setForm] = useState({ ai_provider: 'ollama', vector_driver: 'meilisearch', rag_top_k: 5, active_vector_db: 'meilisearch', llm_provider: 'ollama' });
  const [loading, setLoading] = useState(false);

  const save = async () => {
    setLoading(true);
    try { await apiService.updateSettings(form); } finally { setLoading(false); }
  };

  return <Stack spacing={2}><SettingsTabs value={tab} onChange={setTab} />{tab === 'llm' ? <LLMCard model={form.llm_provider} /> : null}{tab === 'vectordb' ? <VectorDBCard name={form.active_vector_db} active={true} /> : null}<TextField select label="AI Provider" value={form.ai_provider} onChange={(e) => setForm((f) => ({ ...f, ai_provider: e.target.value }))}><MenuItem value="ollama">ollama</MenuItem><MenuItem value="openai">openai</MenuItem></TextField><TextField select label="Vector Driver" value={form.vector_driver} onChange={(e) => setForm((f) => ({ ...f, vector_driver: e.target.value }))}><MenuItem value="meilisearch">meilisearch</MenuItem><MenuItem value="database">database</MenuItem><MenuItem value="redis">redis</MenuItem></TextField><Button loading={loading} onClick={save}>Save</Button></Stack>;
}
