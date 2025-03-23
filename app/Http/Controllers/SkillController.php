<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $skill = new Skill($validated);
        $skill->save();

        return response()->json([
            'message' => 'Successfully created new skill',
            'skill' => $skill
        ]);
    }
}
