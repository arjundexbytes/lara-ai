import React from 'react';
import SkeletonLoader from '@/src/components/loaders/SkeletonLoader';
import Alert from '@/src/components/alerts/Alert';

export default function LoaderWrapper({ loading, error, children }: { loading: boolean; error?: string; children: React.ReactNode }) {
  if (loading) return <SkeletonLoader rows={4} />;
  if (error) return <Alert>{error}</Alert>;
  return <>{children}</>;
}
