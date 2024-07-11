<?php

namespace App\Http\Controllers;

use App\Models\Mentor;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class MentorController extends Controller
{
    public function index()
    {
        $mentors = Mentor::all();
        return response()->json([
            'status' => 'success',
            'data' => $mentors
        ]);
    }

    public function show($id)
    {
        $mentor = Mentor::find($id);
        if (!$mentor) {
            return response()->json([
                'status' => 'error',
                'message' => 'mentor not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $mentor
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email:dns|unique:mentors',
            'profile' => 'required|url',
            'profession' => 'string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 400);
        }

        $mentor = Mentor::create($request->all());

        return response()->json([
            'status' => 'success',
            'data' => $mentor
        ], 200);
    }

    public function update(Request $request, $id)
    {
        // return response()->json($id);
        $mentor = Mentor::find($id);
        if (!$mentor) {
            return response()->json([
                'status' => 'error',
                'message' => 'mentor not found',
            ], 404);
        }


        if ($request['email'] !== $mentor['email']) {
            $rule = [
                'name' => 'string',
                'email' => 'email:dns|unique:mentors',
                'profile' => 'url',
                'profession' => 'string'
            ];
        } else {
            $rule = [
                'name' => 'string',
                'email' => 'email:dns',
                'profile' => 'url',
                'profession' => 'string'
            ];
        }
        $validator = Validator::make($request->all(), $rule);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'messaget' => $validator->errors()
            ], 400);
        }

        $mentor->update($request->all());

        return response()->json([
            'status' => 'success',
            'data' => $mentor
        ]);
    }

    public function destroy(Request $request, $id)
    {

        $mentor = Mentor::find($id);
        if (!$mentor) {
            return response()->json([
                'status' => 'error',
                'message' => 'mentor not found',
            ], 404);
        }

        $mentor->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'mentor deleted successfully'
        ]);
    }
}
