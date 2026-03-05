<?php

namespace App\DTO;

final readonly class SortDTO
{
    public function __construct(
        public string $field = 'created_at',
        public string $direction = 'desc',
    ) {}

    public static function fromArray(array $payload): self
    {
        return new self(
            field: $payload['sort']['field'] ?? 'created_at',
            direction: $payload['sort']['direction'] ?? 'desc',
        );
    }
}
