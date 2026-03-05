<?php

namespace App\Services\Cache;

use Illuminate\Contracts\Cache\Repository;

class RedisSemanticCacheService
{
    public function __construct(private readonly Repository $cache) {}

    public function remember(string $key, callable $callback, int $ttl = 600): mixed
    {
        return $this->cache->remember("semantic:$key", $ttl, $callback);
    }
}
