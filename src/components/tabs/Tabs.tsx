import React from 'react';
import MuiTabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function Tabs({ value, onChange, items }: { value: string; onChange: (value: string) => void; items: Array<{ value: string; label: string }> }) {
  return <MuiTabs value={value} onChange={(_, v) => onChange(v)}>{items.map((item) => <Tab key={item.value} value={item.value} label={item.label} />)}</MuiTabs>;
}
