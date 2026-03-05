import React from 'react';

const variants = {
  primary: 'bg-slate-900 text-white border-slate-900',
  danger: 'bg-red-600 text-white border-red-600',
  warning: 'bg-amber-500 text-white border-amber-500',
  success: 'bg-emerald-600 text-white border-emerald-600',
  info: 'bg-blue-600 text-white border-blue-600',
};

export default function Button({ variant = 'primary', loading = false, className = '', children, ...props }) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`rounded border px-3 py-2 text-sm disabled:opacity-60 ${variants[variant] || variants.primary} ${className}`}
      aria-busy={loading}
    >
      {loading ? 'Working…' : children}
    </button>
  );
}
