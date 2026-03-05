import React from 'react';
import NotificationCenter from '@/Components/NotificationCenter';
import ConnectionStatusButton from '@/Components/Status/ConnectionStatusButton';

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
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <NotificationCenter />
      <div className="mx-auto grid min-h-screen max-w-[1400px] grid-cols-1 lg:grid-cols-[240px_1fr]">
        <aside className="border-r bg-slate-900 p-4 text-slate-100">
          <div className="mb-6 text-lg font-semibold">Enterprise AI</div>
          <nav className="space-y-2 text-sm">
            {links.map(([label, href]) => (
              <a key={href} href={href} className="block rounded px-3 py-2 transition hover:bg-slate-800">
                {label}
              </a>
            ))}
          </nav>
        </aside>

        <section>
          <header className="flex flex-wrap items-center justify-between gap-4 border-b bg-white px-6 py-4 shadow-sm">
            <h1 className="text-xl font-semibold">{title}</h1>
            <div className="flex items-center gap-3">
              <ConnectionStatusButton />
              <a href="/users" className="rounded border px-3 py-2 text-sm">Profile</a>
            </div>
          </header>
          <main className="p-5">{children}</main>
        </section>
      </div>
    </div>
  );
}
