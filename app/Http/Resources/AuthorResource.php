<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'firstName' => $this->first_name,
            'lastName' => $this->last_name,
            'dateOfBirth' => $this->date_of_birth,
            'dateOfDeath' => $this->date_of_date,
            'description' => $this->description,
            'skills' => $this->skills,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
