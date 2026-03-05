import React from 'react';

const links = [
  ['Dashboard', '/'],
  ['Chat', '/chat'],
  ['Users', '/users'],
  ['Products', '/products'],
  ['Orders', '/orders'],
  ['Settings', '/settings'],
];

export default function AppLayout({ title, children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b bg-white px-6 py-4">
        <h1 className="text-xl font-semibold">{title}</h1>
        <nav className="mt-3 flex flex-wrap gap-3 text-sm">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="rounded border px-2 py-1 hover:bg-slate-100">
              {label}
            </a>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-7xl p-6">{children}</main>
    </div>
  );
}
