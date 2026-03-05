import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setStatuses } from '@/store/slices/systemSlice';
import { pushNotification } from '@/store/slices/notificationSlice';
import { enterpriseApi } from '@/services/api/enterpriseApi';
import Button from '@/Components/UI/Button';
import Badge from '@/Components/UI/Badge';

export default function ConnectionStatusButton({ compact = false }) {
  const dispatch = useDispatch();
  const { statuses, loading } = useSelector((state) => state.system);

  const check = async () => {
    dispatch(setLoading(true));
    try {
      const data = await enterpriseApi.getSystemStatus();
      dispatch(setStatuses({ db: data.db, redis: data.redis, ai: data.ai }));
      dispatch(pushNotification({ type: 'success', message: 'Connection checks completed.' }));
    } catch {
      dispatch(pushNotification({ type: 'error', message: 'Connection check failed.' }));
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (compact) {
    return <Button onClick={check} loading={loading} variant="success">Check</Button>;
  }

  return (
    <div className="space-y-2">
      <Button onClick={check} loading={loading} variant="success">Verify DB / Redis / AI</Button>
      <div className="flex flex-wrap gap-2 text-sm text-slate-700">
        <Badge tone={statuses.db ? 'success' : 'danger'}>DB: {String(statuses.db)}</Badge>
        <Badge tone={statuses.redis ? 'success' : 'danger'}>Redis: {String(statuses.redis)}</Badge>
        <Badge tone={statuses.ai ? 'success' : 'warning'}>AI: {String(statuses.ai)}</Badge>
      </div>
    </div>
  );
}
