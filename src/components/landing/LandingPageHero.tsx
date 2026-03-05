import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@/src/components/buttons/Button';
import AnimatedChart from '@/src/components/charts/AnimatedChart';

export default function LandingPageHero({ onCta }: { onCta: () => void }) {
  return <Stack spacing={2}><Typography variant="h3">Enterprise AI Platform</Typography><Typography color="text.secondary">Secure, high-performance Laravel AI orchestration with RAG + MCP.</Typography><Button onClick={onCta}>Get Started</Button><AnimatedChart data={[{ label: 'AI', value: 90 }, { label: 'RAG', value: 80 }]} /></Stack>;
}
