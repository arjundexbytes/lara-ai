import React from 'react';
import Skeleton from '@mui/material/Skeleton';

export default function SkeletonLoader({ rows = 3 }: { rows?: number }) {
  return <>{Array.from({ length: rows }).map((_, i) => <Skeleton key={i} height={36} />)}</>;
}
