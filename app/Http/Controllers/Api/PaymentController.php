<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CheckoutSessionRequest;
use App\Models\PaymentLog;
use App\Models\Plan;
use App\Models\UserSubscription;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function checkoutSession(CheckoutSessionRequest $request): JsonResponse
    {
        $payload = $request->validated();
        $plan = Plan::query()->findOrFail((int) $payload['plan_id']);

        // Placeholder checkout token for Stripe/Mollie integration.
        return response()->json([
            'provider' => 'stripe',
            'checkout_reference' => hash('sha256', $request->user()->id.'|'.$plan->id.'|'.now()->timestamp),
            'plan' => $plan,
            'success_url' => $payload['success_url'],
            'cancel_url' => $payload['cancel_url'],
        ]);
    }

    public function webhook(Request $request): JsonResponse
    {
        $event = (array) $request->input('event', []);
        $data = (array) ($event['data'] ?? []);

        $subscription = null;

        if (! empty($data['subscription_id'])) {
            $subscription = UserSubscription::query()->where('provider_subscription_id', (string) $data['subscription_id'])->first();
        }

        PaymentLog::query()->create([
            'user_id' => $subscription?->user_id,
            'user_subscription_id' => $subscription?->id,
            'provider' => (string) ($request->input('provider', 'stripe')),
            'event_type' => (string) ($event['type'] ?? 'unknown'),
            'provider_event_id' => (string) ($event['id'] ?? ''),
            'amount_cents' => (int) ($data['amount_cents'] ?? 0),
            'currency' => (string) ($data['currency'] ?? 'USD'),
            'status' => (string) ($data['status'] ?? 'received'),
            'payload' => $request->all(),
        ]);

        if ($subscription && isset($data['status'])) {
            $subscription->update(['status' => (string) $data['status']]);
        }

        return response()->json(['received' => true]);
    }
}
