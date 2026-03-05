<?php

namespace App\DTO;

final readonly class FilterDTO
{
    public function __construct(
        public array $filters = [],
        public ?string $dateFrom = null,
        public ?string $dateTo = null,
    ) {}

    public static function fromArray(array $payload): self
    {
        return new self(
            filters: $payload['filters'] ?? [],
            dateFrom: $payload['date_from'] ?? null,
            dateTo: $payload['date_to'] ?? null,
        );
    }
}
