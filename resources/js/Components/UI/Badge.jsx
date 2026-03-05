import React from 'react';

export default function Badge({ children, tone = 'info' }) {
  const tones = {
    info: 'bg-blue-50 text-blue-700',
    success: 'bg-emerald-50 text-emerald-700',
    warning: 'bg-amber-50 text-amber-700',
    danger: 'bg-red-50 text-red-700',
  };

  return <span className={`rounded-full px-2 py-1 text-xs ${tones[tone] || tones.info}`}>{children}</span>;
}
