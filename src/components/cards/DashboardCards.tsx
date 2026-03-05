import React from 'react';
import Grid from '@mui/material/Grid';
import MetricChart from '@/src/components/charts/MetricChart';

export default function DashboardCards({ metrics }: { metrics: Record<string, string | number> }) {
  return <Grid container spacing={2}>{Object.entries(metrics).map(([k, v]) => <Grid item xs={12} md={3} key={k}><MetricChart title={k} value={v} /></Grid>)}</Grid>;
}
