<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Document extends Model
{
    use HasFactory;
    use Searchable;

    public $timestamps = false;

    protected $fillable = ['title', 'content', 'embedding', 'file_type'];

    protected $casts = [
        'embedding' => 'array',
    ];

    public function toSearchableArray(): array
    {
        return $this->only(['id', 'title', 'content', 'file_type']);
    }
}
