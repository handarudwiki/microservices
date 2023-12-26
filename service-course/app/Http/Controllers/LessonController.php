<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class LessonController extends Controller
{
    public function index(Request $request)
    {
        $lessons = Lesson::query();

        $chapterId = $request->query('chapter_id');

        $lesson = $lessons->when($chapterId, function ($q) use ($chapterId) {
            return $q->where('chapter_id', $chapterId);
        })->get();

        return response()->json([
            'status' => 'success',
            'data' => $lesson
        ]);
    }

    public function show($id)
    {
        $lesson = Lesson::find($id);
        if (!$lesson) {
            return response()->json([
                'status' => 'error',
                'message' => 'data not found',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $lesson
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'video' => 'required|string',
            'chapter_id' => 'required|exists:chapters,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 400);
        }

        $lesson = Lesson::create($request->all());
        return response()->json([
            'status' => 'success',
            'data' => $lesson
        ]);
    }

    public function update(Request $request, $id)
    {
        $lesson = Lesson::find($id);

        if (!$lesson) {
            return response()->json([
                'status' => 'error',
                'message' => 'lesson not found',
            ], 400);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'string',
            'video' => 'string',
            'chapter_id' => 'exists:chapters,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 400);
        }

        $lesson->update($request->all());

        return response()->json([
            'status' => 'success',
            'data' => $lesson
        ]);
    }

    public function destroy($id)
    {
        $lesson = Lesson::find($id);
        if (!$lesson) {
            return response()->json([
                'status' => 'error',
                'message' => 'data not found',
            ]);
        }

        $lesson->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'data deleted successfully'
        ]);
    }
}
