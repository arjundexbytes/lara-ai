import React from 'react';
import Tabs from '@/src/components/tabs/Tabs';

export default function SettingsTabs({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <Tabs value={value} onChange={onChange} items={[{ value: 'llm', label: 'LLM' }, { value: 'vectordb', label: 'Vector DB' }, { value: 'drivers', label: 'Drivers' }, { value: 'campaigns', label: 'Campaigns' }]} />;
}
