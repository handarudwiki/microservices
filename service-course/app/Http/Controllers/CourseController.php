<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Review;
use App\Models\MyCourse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::query();
        return response()->json([
            'status' => 'success',
            'data' => $courses->paginate(10)
        ]);
    }

    public function show($id)
    {
        $course = Course::with(['mentor', 'chapters.lessons', 'images', 'reviews'])->find($id);
        $totalStudent = MyCourse::where('course_id', $id)->count();

        if (!$course) {
            return response()->json([
                'status' => 'error',
                'message' => 'Course not found',
            ], 404);
        }

        $reviews = Review::where('course_id', $id)->get()->toArray();

        if (count($reviews) > 0) {
            $users = array_column($reviews, 'user_id');
            $users = getUserByIds($users);
        }
        for ($i = 0; $i < count($reviews); $i++) {
            $course['reviews'][$i]['user_id'] = $users['data'][$i];
        }

        $totalVideo = $course->chapters->flatMap->lessons->count();

        $course['total_video'] = $totalVideo;
        $course['total_student'] = $totalStudent;

        return response()->json([
            'status' => 'success',
            'data' => $course
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'certificate' => 'required|boolean',
            'thumbnail' => 'required|url',
            'type' => 'required|in:free,premium',
            'status' => 'required|in:draft,published',
            'price' => 'required|integer|min:0',
            'level' => 'required|in:all-level,beginer,intermediate,advance',
            'description' => 'required|string',
            'mentor_id' => 'required|exists:mentors,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 400);
        }

        $course = Course::create($request->all());

        return response()->json([
            'status' => 'success',
            'data' => $course
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $course = Course::find($id);

        if (!$course) {
            return response()->json([
                'status' => 'error',
                'message' => 'Course not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'string',
            'certificate' => 'boolean',
            'thumbnail' => 'url',
            'type' => 'in:free,premium',
            'status' => 'in:draft,published',
            'price' => 'integer|min:0',
            'level' => 'in:all-level,beginer,intermediate,advance',
            'description' => 'string',
            'mentor_id' => 'exists:mentors,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 400);
        }

        $course->update($request->all());

        return response()->json([
            'status' => 'success',
            'data' => $course
        ]);
    }

    public function destroy($id)
    {
        $course = Course::find($id);
        if (!$course) {
            return response()->json([
                'status' => 'error',
                'message' => 'course not found',
            ], 404);
        }

        $course->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'course deleted successfully'
        ]);
    }
}
