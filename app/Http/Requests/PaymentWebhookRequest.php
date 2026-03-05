<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PaymentWebhookRequest extends FormRequest
{
    public function authorize(): bool
    {
        $expected = (string) config('payment.webhook_secret', '');
        $provided = (string) $this->header('X-Webhook-Secret', '');

        return $expected !== '' && hash_equals($expected, $provided);
    }

    public function rules(): array
    {
        return [
            'provider' => ['nullable', 'in:stripe,mollie'],
            'event' => ['required', 'array'],
            'event.id' => ['nullable', 'string', 'max:191'],
            'event.type' => ['required', 'string', 'max:191'],
            'event.data' => ['nullable', 'array'],
            'event.data.subscription_id' => ['nullable', 'string', 'max:191'],
            'event.data.amount_cents' => ['nullable', 'integer', 'min:0'],
            'event.data.currency' => ['nullable', 'string', 'size:3'],
            'event.data.status' => ['nullable', 'string', 'max:40'],
        ];
    }
}
