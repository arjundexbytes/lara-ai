import React from 'react';

export default function OrdersTable({ orders = [] }) {
  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Total</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t transition-colors hover:bg-indigo-50">
              <td className="px-4 py-2">{order.id}</td>
              <td className="px-4 py-2">{order.status}</td>
              <td className="px-4 py-2">{order.total}</td>
              <td className="px-4 py-2">
                <button className="rounded border px-2 py-1 text-xs">Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
