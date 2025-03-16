<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Book extends Model
{
   protected $fillable = [
    'title',
    'author',
    'publisher',
    'release_date',
    'description'
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
}
