<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChangeSubscriptionRequest;
use App\Models\Plan;
use App\Models\UserSubscription;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $plans = Plan::query()->where('is_active', true)->orderBy('price_cents')->get();
        $subscription = $user?->activeSubscription()->with('plan')->first();

        return response()->json([
            'plans' => $plans,
            'subscription' => $subscription,
        ]);
    }

    public function change(ChangeSubscriptionRequest $request): JsonResponse
    {
        $user = $request->user();
        $plan = Plan::query()->findOrFail((int) $request->validated('plan_id'));

        UserSubscription::query()
            ->where('user_id', $user->id)
            ->where('status', 'active')
            ->update(['status' => 'canceled', 'canceled_at' => now()]);

        $subscription = UserSubscription::query()->create([
            'user_id' => $user->id,
            'plan_id' => $plan->id,
            'status' => 'active',
            'provider' => 'stripe',
            'starts_at' => now(),
            'renews_at' => now()->addMonth(),
        ]);

        return response()->json(['subscription' => $subscription->load('plan')]);
    }

    public function cancel(Request $request): JsonResponse
    {
        $subscription = $request->user()?->activeSubscription()->first();

        if (! $subscription) {
            return response()->json(['message' => 'No active subscription'], 422);
        }

        $subscription->update([
            'status' => 'canceled',
            'canceled_at' => now(),
        ]);

        return response()->json(['message' => 'Subscription canceled']);
    }
}
