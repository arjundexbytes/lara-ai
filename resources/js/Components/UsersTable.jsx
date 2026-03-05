import React from 'react';

export default function UsersTable({ users = [], loadingActionId = null, onDelete, onAssignPermissions }) {
  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Roles</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t transition-colors hover:bg-indigo-50">
              <td className="px-4 py-2"><a href={`/users/${user.id}`} className="text-indigo-700 hover:underline">{user.name}</a></td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{(user.roles || []).map((r) => r.name || r).join(', ')}</td>
              <td className="px-4 py-2 space-x-2">
                <button className="rounded border px-2 py-1 text-xs">Edit</button>
                <button
                  disabled={loadingActionId === user.id}
                  onClick={() => onAssignPermissions?.(user)}
                  className="rounded border px-2 py-1 text-xs disabled:opacity-60"
                >
                  {loadingActionId === user.id ? 'Loading...' : 'Assign Permissions'}
                </button>
                <button
                  disabled={loadingActionId === user.id}
                  onClick={() => onDelete?.(user)}
                  className="rounded border border-red-300 px-2 py-1 text-xs text-red-700 disabled:opacity-60"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
