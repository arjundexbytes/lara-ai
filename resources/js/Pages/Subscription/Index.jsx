import React, { useEffect, useMemo, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Button from '@/Components/UI/Button';
import Alert from '@/Components/UI/Alert';
import Skeleton from '@/Components/UI/Skeleton';
import { enterpriseApi } from '@/services/api/enterpriseApi';

export default function SubscriptionIndex() {
  const [state, setState] = useState({ loading: true, plans: [], subscription: null, saving: false, error: '' });

  useEffect(() => {
    enterpriseApi.getSubscriptions()
      .then((data) => setState((s) => ({ ...s, loading: false, plans: data.plans || [], subscription: data.subscription || null })))
      .catch(() => setState((s) => ({ ...s, loading: false, error: 'Failed to load subscription data.' })));
  }, []);

  const activePlanId = useMemo(() => state.subscription?.plan_id, [state.subscription]);

  const switchPlan = async (planId) => {
    setState((s) => ({ ...s, saving: true, error: '' }));

    try {
      const checkout = await enterpriseApi.createCheckoutSession({ plan_id: planId, success_url: window.location.href, cancel_url: window.location.href });
      await enterpriseApi.changeSubscription(planId);
      setState((s) => ({ ...s, saving: false, subscription: { ...(s.subscription || {}), plan_id: Number(planId), checkout_reference: checkout.checkout_reference } }));
    } catch (error) {
      setState((s) => ({ ...s, saving: false, error: error?.message || 'Unable to update plan.' }));
    }
  };

  const cancelPlan = async () => {
    setState((s) => ({ ...s, saving: true, error: '' }));
    try {
      await enterpriseApi.cancelSubscription();
      setState((s) => ({ ...s, saving: false, subscription: null }));
    } catch {
      setState((s) => ({ ...s, saving: false, error: 'Unable to cancel subscription.' }));
    }
  };

  return (
    <AppLayout title="Subscription Management">
      {state.error ? <Alert tone="danger">{state.error}</Alert> : null}
      {state.loading ? <Skeleton className="h-40 w-full" /> : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {state.plans.map((plan) => (
            <article key={plan.id} className="rounded border bg-white p-4 shadow-sm">
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="text-sm text-slate-600">${(plan.price_cents / 100).toFixed(2)} / month</p>
              <p className="text-xs text-slate-500">AI limit/day: {plan.ai_query_limit_per_day}</p>
              <div className="mt-3 flex gap-2">
                <Button disabled={state.saving || activePlanId === plan.id} onClick={() => switchPlan(plan.id)}>
                  {activePlanId === plan.id ? 'Current Plan' : (state.saving ? 'Updating...' : 'Choose Plan')}
                </Button>
                {activePlanId === plan.id ? <Button variant="warning" onClick={cancelPlan} disabled={state.saving}>Cancel</Button> : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </AppLayout>
  );
}
