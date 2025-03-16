<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Image extends Model
{
    protected $fillable = [
        'path',
        'alt',
        'name'
    ];

    public function books(): MorphToMany
    {
        return $this->morphedByMany(Book::class,'imageable')->withTimestamps();
    }

    public function getUrlAttribute()
    {
        return asset('storage/' . $this->path);
    }
}
