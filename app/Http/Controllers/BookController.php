<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'publisher' => 'required|string|max:255',
            'releaseDate' => 'required|date',
            'description' => 'required|string',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        unset($validated['images']);

        $book = new Book($validated);
        $book->release_date = $validated['releaseDate'];
        $book->save();
        if($request->hasFile('images')){
            $imageList = [];
            foreach($request->file('images') as $image){
                $path = $image->store('images', 'public');
                $imageList[] = [
                    "path" => $path,
                    "name" => $image->getClientOriginalName(),
                    "alt" => $image->getClientOriginalName(),
                ];
            }
            $book->images()->createMany($imageList);
        }

        return response()->json([
            'message' => 'Successfully created new book',
            'book' => $book
        ]);
    }
}
