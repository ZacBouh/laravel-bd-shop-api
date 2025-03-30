<?php

namespace App\Http\Controllers;

use App\Http\Resources\AuthorResource;
use App\Models\Author;
use App\Models\Skill;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'dateOfBirth' => 'nullable|date',
            'dateOfDeath' => 'nullable|date',
            'description' => 'string',
            'skills' => 'nullable|integer|exists:skills,id'
        ]);

        $correctedKeys = [
            'first_name' => $validated['firstName'],
            'last_name' => $validated['lastName'],
            'date_of_birth' => $validated['dateOfBirth'],
            'date_of_date' => $validated['dateOfDeath'],
            ...$validated
        ];
        $author = new Author($correctedKeys);
        $author->save();
        if(!empty($validated['skills'])){
            $skills = Skill::findMany($validated['skills']);
            if(!is_null($skills)){
                $author->skills()->attach($skills->pluck('id'));
            }
        }

        return response()->json([
            'message' => 'Successfully created Author',
            'author' => new AuthorResource($author)
        ]);
    }

    public function getAuthors(){
        return response()->json([
            'message' => 'Successfully retrieved authors',
            'authors' => AuthorResource::collection(Author::all())
        ]);
    }

    public function destroy(Author $author){
        $author->deleteOrFail();
        return response()->json([
            'message' => 'Successfully deleted Author',
            'author' => $author
        ]);
    }
}
