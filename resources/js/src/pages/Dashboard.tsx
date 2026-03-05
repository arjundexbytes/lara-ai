import React from 'react';
import Stack from '@mui/material/Stack';
import { useFetch } from '@/src/hooks/useFetch';
import { apiService } from '@/src/api/apiService';
import DashboardCards from '@/src/components/cards/DashboardCards';
import AnimatedChart from '@/src/components/charts/AnimatedChart';
import AnalyticsTable from '@/src/components/analytics/AnalyticsTable';
import LoaderWrapper from '@/src/components/wrappers/LoaderWrapper';
import Topbar from '@/src/components/layout/Topbar';
import ConnectionStatus from '@/src/components/status/ConnectionStatus';

export default function Dashboard() {
  const { data, loading, error } = useFetch(() => apiService.dashboard(), []);
  const payload = (data as any) || {};
  const metrics = payload.metrics || {};

  return (
    <Stack spacing={2}>
      <Topbar latency={Number(metrics.avg_ai_latency_ms || 0)} status={metrics.system_health || 'unknown'} />
      <LoaderWrapper loading={loading} error={error}>
        <ConnectionStatus db={true} redis={true} ai={metrics.system_health === 'healthy'} />
        <DashboardCards metrics={{ ai_latency_ms: metrics.avg_ai_latency_ms || 0, ai_requests_today: metrics.ai_requests_today || 0, error_rate: metrics.error_rate || 0, system_health: metrics.system_health || 'unknown' }} />
        <AnimatedChart data={[{ label: 'Requests', value: Number(metrics.ai_requests_today || 0) }, { label: 'Errors%', value: Math.round(Number(metrics.error_rate || 0) * 100) }]} />
        <AnalyticsTable rows={[{ id: 1, metric: 'latest_orders', value: (payload.latest_orders || []).length }, { id: 2, metric: 'latest_chat', value: (payload.latest_chat || []).length }]} />
      </LoaderWrapper>
    </Stack>
  );
}
