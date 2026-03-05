import React from 'react';
import Button from '@/Components/UI/Button';

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
              <td className="space-x-2 px-4 py-2">
                <Button variant="info" className="px-2 py-1 text-xs">Edit</Button>
                {onAssignPermissions ? (
                  <Button
                    variant="primary"
                    loading={loadingActionId === user.id}
                    onClick={() => onAssignPermissions?.(user)}
                    className="px-2 py-1 text-xs"
                  >
                    Assign Permissions
                  </Button>
                ) : null}
                {onDelete ? (
                  <Button
                    variant="danger"
                    loading={loadingActionId === user.id}
                    onClick={() => onDelete?.(user)}
                    className="px-2 py-1 text-xs"
                  >
                    Delete
                  </Button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
