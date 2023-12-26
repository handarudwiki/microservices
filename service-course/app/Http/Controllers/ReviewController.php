<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'course_id' => 'required|exists:courses,id',
            'rating' => 'required|integer|min:1|max:5',
            'note' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 400);
        }

        $user = getUser($request->input('user_id'));

        if ($user['status'] == 'error') {
            return response()->json([
                'status' => 'error',
                'message' => $user['status']
            ], $user['http_code']);
        }

        $review = Review::where('user_id', $user['data']['id'])
            ->where('course_id', $request->input('course_id'))->get();

        if (count($review) !== 0) {
            return response()->json([
                'status' => 'error',
                'message' => 'user has already reviewed this course'
            ], 409);
        }

        $review = Review::create($request->all());
        return response()->json([
            'status' => 'error',
            'data' => $review
        ]);
    }

    public function update(Request $request, $id)
    {
        $review = Review::find($id);

        if (!$review) {
            return response()->json([
                'status' => 'error',
                'message' => 'data not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'rating' => 'integer|min:1|max:5',
            'note' => 'string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 400);
        }
        $review->update($request->all());
        return response()->json([
            'status' => 'error',
            'data' => $review
        ]);
    }

    public function destroy($id)
    {
        $review = Review::find($id);

        if (!$review) {
            return response()->json([
                'status' => 'error',
                'message' => 'data not found',
            ], 404);
        }

        $review->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'data deleted successfully'
        ]);
    }
}
