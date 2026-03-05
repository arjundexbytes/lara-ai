import React, { useEffect, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Alert from '@/Components/UI/Alert';
import Button from '@/Components/UI/Button';
import { enterpriseApi } from '@/services/api/enterpriseApi';

export default function Profile() {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    enterpriseApi.getSubscriptions().then((data) => {
      setPlans(data.plans || []);
      setSelectedPlan(String(data.subscription?.plan_id || ''));
    }).catch(() => null);
  }, []);

  const onSave = async () => {
    if (!selectedPlan) return;
    await enterpriseApi.changeSubscription(Number(selectedPlan));
    setMessage('Plan updated successfully.');
  };

  return (
    <AppLayout title="Profile">
      {message ? <Alert tone="success">{message}</Alert> : null}
      <div className="max-w-xl rounded border bg-white p-4">
        <label className="mb-2 block text-sm font-medium">Subscription plan</label>
        <select value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)} className="w-full rounded border px-3 py-2">
          <option value="">Select a plan</option>
          {plans.map((plan) => <option key={plan.id} value={plan.id}>{plan.name}</option>)}
        </select>
        <div className="mt-3">
          <Button onClick={onSave}>Save</Button>
        </div>
      </div>
    </AppLayout>
  );
}
