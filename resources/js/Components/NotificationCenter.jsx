import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dismissNotification } from '@/store/slices/notificationSlice';

export default function NotificationCenter() {
  const items = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  if (!items.length) return null;

  return (
    <div className="fixed right-4 top-4 z-50 space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className={`transform rounded border px-4 py-3 text-sm shadow transition-all duration-300 ${
            item.type === 'error' ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <span>{item.message}</span>
            <button onClick={() => dispatch(dismissNotification(item.id))} className="rounded border px-2 py-1 text-xs">
              Close
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
