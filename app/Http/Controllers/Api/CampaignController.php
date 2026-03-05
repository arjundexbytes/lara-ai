<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpsertCampaignRequest;
use App\Models\Campaign;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CampaignController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $q = trim((string) $request->query('q', ''));
        $status = trim((string) $request->query('status', ''));
        $perPage = max(1, min(50, (int) $request->query('per_page', 10)));

        $items = Campaign::query()
            ->when($q !== '', fn ($query) => $query->where('name', 'like', "%$q%"))
            ->when($status !== '', fn ($query) => $query->where('status', $status))
            ->latest()
            ->paginate($perPage);

        return response()->json($items);
    }

    public function store(UpsertCampaignRequest $request): JsonResponse
    {
        $campaign = Campaign::query()->create($request->validated());

        return response()->json($campaign, 201);
    }

    public function update(UpsertCampaignRequest $request, Campaign $campaign): JsonResponse
    {
        $campaign->update($request->validated());

        return response()->json($campaign);
    }

    public function destroy(Campaign $campaign): JsonResponse
    {
        $campaign->delete();

        return response()->json(['deleted' => true]);
    }
}
