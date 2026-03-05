import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setStatuses } from '@/store/slices/systemSlice';
import { pushNotification } from '@/store/slices/notificationSlice';

export default function ConnectionStatusButton() {
  const dispatch = useDispatch();
  const { statuses, loading } = useSelector((state) => state.system);

  const check = async () => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.get('/api/system/status');
      dispatch(setStatuses({ db: data.db, redis: data.redis, ai: data.ai }));
      dispatch(pushNotification({ type: 'success', message: 'Connection checks completed.' }));
    } catch {
      dispatch(pushNotification({ type: 'error', message: 'Connection check failed.' }));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={check}
        className="rounded bg-emerald-600 px-4 py-2 text-white disabled:opacity-70"
        disabled={loading}
      >
        {loading ? 'Checking…' : 'Verify DB / Redis / AI'}
      </button>
      <div className="text-sm text-slate-700">
        DB: {String(statuses.db)} | Redis: {String(statuses.redis)} | AI: {String(statuses.ai)}
      </div>
    </div>
  );
}
