<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class ChapterController extends Controller
{
    public function index(Request $request)
    {
        $chapters = Chapter::query();

        $courseId = $request->query('course_id');

        $chapters = $chapters->when($courseId, function ($q) use ($courseId) {
            return $q->where('course_id', $courseId);
        })->get();

        return response()->json([
            'status' => 'success',
            'data' => $chapters
        ]);
    }

    public function show($id)
    {
        $chapter = Chapter::find($id);
        if (!$chapter) {
            return response()->json([
                'status' => 'error',
                'message' => 'data not found',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $chapter
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'course_id' => 'required|exists:courses,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 400);
        }

        $chapter = Chapter::create($request->all());

        return response()->json([
            'status' => 'success',
            'data' => $chapter
        ]);
    }

    public function update(Request $request, $id)
    {
        $chapter = Chapter::find($id);
        if (!$chapter) {
            return response()->json([
                'status' => 'error',
                'message' => 'chapter not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'string',
            'course_id' => 'exists:courses,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 400);
        }

        $chapter->update($request->all());

        return response()->json([
            'status' => 'success',
            'data' => $chapter
        ]);
    }

    public function destroy($id)
    {
        $chapter = Chapter::find($id);

        if (!$chapter) {
            return response()->json([
                'status' => 'error',
                'message' => 'chapter not found',
            ], 404);
        }

        $chapter->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'chapter deleted successfully',
        ]);
    }
}
