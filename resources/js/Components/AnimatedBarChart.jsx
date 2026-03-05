import React from 'react';

export default function AnimatedBarChart({ data = [] }) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="space-y-2">
      {data.map((item) => (
        <div key={item.label}>
          <div className="mb-1 text-xs text-slate-600">{item.label}</div>
          <div className="h-3 w-full rounded bg-slate-100">
            <div
              className="h-3 rounded bg-indigo-500 transition-all duration-700"
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
