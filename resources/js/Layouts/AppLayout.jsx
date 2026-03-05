import React, { useEffect, useMemo, useState } from 'react';
import { usePage } from '@inertiajs/react';
import NotificationCenter from '@/Components/NotificationCenter';
import ConnectionStatusButton from '@/Components/Status/ConnectionStatusButton';
import Badge from '@/Components/UI/Badge';
import { enterpriseApi } from '@/services/api/enterpriseApi';

const links = [
  ['Dashboard', '/dashboard'],
  ['Chat', '/chat'],
  ['Users', '/users'],
  ['Products', '/products'],
  ['Orders', '/orders'],
  ['Documents', '/documents'],
  ['Settings', '/settings'],
  ['Roles', '/roles'],
  ['Permissions', '/permissions'],
];

export default function AppLayout({ title, children }) {
  const page = usePage();
  const [stats, setStats] = useState({ avg_ai_latency_ms: 0, system_health: 'unknown' });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    enterpriseApi.getDashboardMetrics().then((data) => setStats(data?.metrics || {})).catch(() => null);
  }, []);

  const currentPath = useMemo(() => page?.url?.split('?')[0] || '', [page?.url]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <NotificationCenter />
      <div className="mx-auto grid min-h-screen max-w-[1400px] grid-cols-1 lg:grid-cols-[240px_1fr]">
        <aside className="border-r bg-slate-900 p-4 text-slate-100">
          <div className="mb-6 text-lg font-semibold">Enterprise AI</div>
          <nav className="space-y-2 text-sm">
            {links.map(([label, href]) => {
              const active = currentPath === href;

              return (
                <a key={href} href={href} className={`block rounded px-3 py-2 transition ${active ? 'bg-slate-700 font-semibold' : 'hover:bg-slate-800'}`} aria-current={active ? 'page' : undefined}>
                  {label}
                </a>
              );
            })}
          </nav>
        </aside>

        <section>
          <header className="flex flex-wrap items-center justify-between gap-4 border-b bg-white px-6 py-4 shadow-sm">
            <h1 className="text-xl font-semibold">{title}</h1>
            <div className="flex items-center gap-3">
              <Badge tone="info">AI latency: {Number(stats.avg_ai_latency_ms || 0).toFixed(0)}ms</Badge>
              <Badge tone={stats.system_health === 'healthy' ? 'success' : 'warning'}>Status: {stats.system_health || 'unknown'}</Badge>
              <ConnectionStatusButton compact />
              <div className="relative">
                <button onClick={() => setMenuOpen((v) => !v)} className="rounded border px-3 py-2 text-sm" aria-haspopup="menu" aria-expanded={menuOpen}>
                  Profile ▾
                </button>
                {menuOpen ? (
                  <div className="absolute right-0 z-20 mt-2 w-44 rounded border bg-white p-1 shadow" role="menu">
                    <a href="/users" className="block rounded px-3 py-2 text-sm hover:bg-slate-100" role="menuitem">Users</a>
                    <a href="/settings" className="block rounded px-3 py-2 text-sm hover:bg-slate-100" role="menuitem">Settings</a>
                  </div>
                ) : null}
              </div>
            </div>
          </header>
          <main className="p-5">{children}</main>
        </section>
      </div>
    </div>
  );
}
