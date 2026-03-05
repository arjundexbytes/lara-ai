<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UploadStoreRequest;
use App\Models\Upload;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $q = trim((string) $request->query('q', ''));
        $type = trim((string) $request->query('type', ''));
        $conversationId = trim((string) $request->query('conversation_id', ''));
        $perPage = max(1, min(50, (int) $request->query('per_page', 12)));

        $uploads = Upload::query()
            ->when(! $request->user()->can('manage uploads'), fn ($query) => $query->where('uploaded_by', $request->user()->id))
            ->when($q !== '', fn ($query) => $query->where('name', 'like', "%$q%"))
            ->when($type !== '', fn ($query) => $query->where('mime_type', 'like', "%$type%"))
            ->when($conversationId !== '', fn ($query) => $query->where('conversation_id', $conversationId))
            ->latest()
            ->paginate($perPage);

        return response()->json($uploads);
    }

    public function store(UploadStoreRequest $request): JsonResponse
    {
        $file = $request->file('file');
        $path = $file->store('uploads', 'public');

        $upload = Upload::query()->create([
            'name' => $file->getClientOriginalName(),
            'disk' => 'public',
            'path' => $path,
            'mime_type' => (string) $file->getMimeType(),
            'size' => (int) $file->getSize(),
            'uploaded_by' => (int) $request->user()->id,
            'conversation_id' => $request->input('conversation_id'),
        ]);

        return response()->json($upload, 201);
    }

    public function destroy(Request $request, Upload $upload): JsonResponse
    {
        if (! $request->user()->can('manage uploads') && $upload->uploaded_by !== (int) $request->user()->id) {
            abort(403);
        }

        Storage::disk($upload->disk)->delete($upload->path);
        $upload->delete();

        return response()->json(['deleted' => true]);
    }
}
