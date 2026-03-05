import React from 'react';
import AnimatedBarChart from '@/Components/AnimatedBarChart';

export default function LandingIndex() {
  const serviceData = [
    { label: 'RAG Accuracy', value: 92 },
    { label: 'Avg Latency', value: 78 },
    { label: 'System Health', value: 99 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">Enterprise AI Platform for Laravel 12</h1>
            <p className="mt-4 text-slate-300">Secure RAG + MCP orchestration, Redis semantic cache, Scout vector search, and Octane-optimized AI endpoints.</p>
            <div className="mt-6 flex gap-3">
              <a href="/login" className="rounded bg-indigo-500 px-4 py-2 font-medium transition hover:bg-indigo-400">Sign In</a>
              <a href="/register" className="rounded border border-slate-600 px-4 py-2 font-medium transition hover:bg-slate-800">Register</a>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
            <h3 className="mb-4 text-lg font-semibold">Live Service Graph</h3>
            <AnimatedBarChart data={serviceData} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            'AI Query Orchestration (11-layer architecture)',
            'Role-based secure APIs (Boaster + Sprite)',
            'Realtime metrics, chat, and document intelligence',
          ].map((feature) => (
            <div key={feature} className="rounded-xl border border-slate-700 bg-slate-900 p-4 transition duration-300 hover:-translate-y-1 hover:border-indigo-400">
              {feature}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
