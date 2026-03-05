import React from 'react';

export default function Skeleton({ className = 'h-16' }) {
  return <div className={`animate-pulse rounded bg-slate-200 ${className}`} />;
}
