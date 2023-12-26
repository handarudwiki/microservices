<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\ImageCourse;
use Illuminate\Support\Facades\Validator;

class ImageCourseController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|exists:courses,id',
            'image' => 'required|url'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 404);
        }

        $imageCourse = ImageCourse::create($request->all());

        return response()->json([
            'status' => 'success',
            'data' => $imageCourse
        ]);
    }

    public function destroy($id)
    {
        $imageCourse = ImageCourse::find($id);

        if (!$imageCourse) {
            return response()->json([
                'status' => 'error',
                'message' => 'data not found',
            ], 404);
        }

        $imageCourse->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'image deleted successfully'
        ]);
    }
}
