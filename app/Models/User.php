<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Scout\Searchable;

class User extends Authenticatable
{
    use HasFactory;
    use Searchable;

    protected $fillable = ['name', 'email', 'role', 'password'];

    protected $hidden = ['password'];

    public function toSearchableArray(): array
    {
        return $this->only(['id', 'name', 'email', 'role']);
    }
}
