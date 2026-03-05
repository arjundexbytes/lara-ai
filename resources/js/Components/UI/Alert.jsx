import React from 'react';

export default function Alert({ type = 'error', children }) {
  const styles = type === 'error' ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700';
  return <div className={`rounded border p-3 text-sm ${styles}`}>{children}</div>;
}
