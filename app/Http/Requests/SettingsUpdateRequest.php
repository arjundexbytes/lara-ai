<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SettingsUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'ai_provider' => ['required', 'in:ollama,openai'],
            'vector_driver' => ['required', 'in:meilisearch,database'],
            'rag_top_k' => ['required', 'integer', 'min:1', 'max:20'],
            'active_vector_db' => ['required', 'string', 'max:120'],
            'llm_provider' => ['required', 'in:ollama,openai,anthropic'],
        ];
    }
}
