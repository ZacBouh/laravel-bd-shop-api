<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Book extends Model
{
   protected $fillable = [
    'title',
    'author',
    'publisher',
    'release_daten',
    'collection',
    'description',
    'language',
    'style'
   ];

   protected function casts(): array
   {
    return [
        'release_date' => 'datetime'
    ];
   }

   public function images(): MorphToMany
   {
    return $this->morphToMany(Image::class, 'imageable')->withTimestamps();
   }

   public function authors(): BelongsToMany
   {
    return $this->belongsToMany(Author::class);
   }
}
