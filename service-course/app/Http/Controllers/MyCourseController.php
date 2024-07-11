<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\MyCourse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class MyCourseController extends Controller
{
    public function index(Request $request)
    {
        $myCourses = MyCourse::query()->with('course');

        $userId = $request->query('user_id');

        $myCourse = $myCourses->when($userId, function ($q) use ($userId) {
            return $q->where('user_id', $userId);
        })->get();


        return response()->json([
            'status' => 'success',
            'data' => $myCourse
        ]);
    }

    public function show($id)
    {
        $course = Course::find($id);
        if (!$course) {
            return response()->json([
                'status' => 'error',
                'message' => 'Course not found',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $course,
        ]);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|exists:courses,id',
            'user_id' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 400);
        }

        $course = Course::find($request->input('course_id'));

        if(!$course){
            return response()->json([
                'status' => 'error',
                'message' => 'course not found'
            ],404);
        }

        $user = getUser($request->input('user_id'));


        if ($user['status'] === 'error') {
            return response()->json([
                'status' => 'error',
                'message' => $user['message'],
            ], $user['http_code']);
        }

        $myCourse = MyCourse::where('user_id', $user['data']['id'])
            ->where('course_id', $request->input('id'))->get();

        if (count($myCourse) !== 0) {
            return response()->json([
                'status' => 'error',
                'message' => 'user already have this course'
            ], 409);
        }

        if($course->type === 'premium'){
            if($course->price == 0){
                return response()->json([
                    'status' => 'error',
                    'message' => "price can't be 0"
                ]);
            }

            $order = postOrder([
                'user' => $user['data'],
                'course' => $course->toArray()
            ]);

            if($order->status !== 'success'){
                return response()->json([
                    'status' => $order['status'],
                    'message' => $order['message']
                ], $order['http_code']);
            }

            return response()->json([
                'status' => $order['status'],
                'data' => $order['data']
            ]);
        }else{
            $myCourse = MyCourse::create($request->all());
        }
        return response()->json([
            'status' => 'success',
            'data' => $myCourse
        ]);
    }

    public function createPremiumAccess(Request $request)
    {
        $data = $request->all();
        $myCourse = MyCourse::create($data);

        return response()->json([
            'status' =>'success',
            'data' => $myCourse
        ]);
    }
}
