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

    public function getSkill()
    {
        $skills = Skill::all();

        return response()->json([
            'message' => 'Successfully retrieved skills',
            'skills' => $skills
        ]);
    }

    public function destroy(Skill $skill){
        $skill->deleteOrFail();
        return response()->json([
            'message' => 'Successfully deleted Skill',
            'skill' => $skill
        ]);
    }
}
