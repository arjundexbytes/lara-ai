<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AIQueryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'query' => ['required', 'string', 'max:5000'],
            'format' => ['nullable', 'string', 'in:json,text,markdown'],
            'conversation_id' => ['required', 'string', 'max:191'],
            'filters' => ['nullable', 'array'],
            'date_from' => ['nullable', 'date'],
            'date_to' => ['nullable', 'date'],
            'sort' => ['nullable', 'array'],
            'sort.field' => ['nullable', 'string'],
            'sort.direction' => ['nullable', 'in:asc,desc'],
        ];
    }
}
