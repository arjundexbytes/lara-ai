<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Product extends Model
{
    use HasFactory;
    use Searchable;

    protected $fillable = ['name', 'category', 'price'];

    public function toSearchableArray(): array
    {
        return $this->only(['id', 'name', 'category', 'price']);
    }
}
