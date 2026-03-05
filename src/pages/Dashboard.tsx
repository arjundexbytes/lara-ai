import React from 'react';
import Grid from '@mui/material/Grid';
import { useFetch } from '@/src/hooks/useFetch';
import { apiService } from '@/src/api/apiService';
import MetricChart from '@/src/components/charts/MetricChart';
import AnimatedChart from '@/src/components/charts/AnimatedChart';
import SkeletonLoader from '@/src/components/loaders/SkeletonLoader';

export default function Dashboard() {
  const { data, loading } = useFetch(() => apiService.dashboard(), []);
  if (loading) return <SkeletonLoader rows={6} />;
  const m = (data as any)?.metrics || {};
  return <Grid container spacing={2}><Grid item xs={12} md={2}><MetricChart title="AI latency" value={m.avg_ai_latency_ms || 0} /></Grid><Grid item xs={12} md={2}><MetricChart title="Requests" value={m.ai_requests_today || 0} /></Grid><Grid item xs={12} md={2}><MetricChart title="Error rate" value={m.error_rate || 0} /></Grid><Grid item xs={12} md={2}><MetricChart title="System" value={m.system_health || 'unknown'} /></Grid><Grid item xs={12}><AnimatedChart data={[{ label: 'req', value: Number(m.ai_requests_today || 0) }]} /></Grid></Grid>;
}
