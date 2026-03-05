<?php

namespace App\Repositories;

use App\DTO\FilterDTO;
use Doctrine\DBAL\Connection;

class OrderAnalyticsRepository
{
    public function __construct(private readonly Connection $connection) {}

    public function totalsByStatus(): array
    {
        return $this->connection->fetchAllAssociative(
            'SELECT status, SUM(total) as total, COUNT(*) as orders_count FROM orders GROUP BY status ORDER BY total DESC'
        );
    }

    public function totalsByDateRange(FilterDTO $filter): array
    {
        if (! $filter->dateFrom || ! $filter->dateTo) {
            return [];
        }

        return $this->connection->fetchAllAssociative(
            'SELECT DATE(created_at) as day, SUM(total) as total FROM orders WHERE created_at BETWEEN :from AND :to GROUP BY DATE(created_at) ORDER BY day',
            ['from' => $filter->dateFrom, 'to' => $filter->dateTo]
        );
    }

    public function userOrderTotals(int $limit = 10): array
    {
        return $this->connection->fetchAllAssociative(
            'SELECT u.id, u.name, SUM(o.total) as spent FROM users u INNER JOIN orders o ON o.user_id = u.id GROUP BY u.id, u.name ORDER BY spent DESC LIMIT :limit',
            ['limit' => $limit],
            ['limit' => \PDO::PARAM_INT]
        );
    }
}
