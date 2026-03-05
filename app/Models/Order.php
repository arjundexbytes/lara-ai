<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Order extends Model
{
    use HasFactory;
    use Searchable;

    protected $fillable = ['user_id', 'total', 'status'];

    public function toSearchableArray(): array
    {
        return $this->only(['id', 'user_id', 'total', 'status']);
    }
}
