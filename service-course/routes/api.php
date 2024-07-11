<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\MentorController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ChapterController;
use App\Http\Controllers\MyCourseController;
use App\Http\Controllers\ImageCourseController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::controller(MentorController::class)
    ->prefix('mentors')
    ->group(function () {
        Route::post('/', 'store');
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'destroy');
        Route::get('/{id}', 'show');
        Route::get('/', 'index');
    });

Route::controller(CourseController::class)
    ->prefix('courses')
    ->group(function () {
        Route::get('/', 'index');
        Route::get('/{id}', 'show');
        Route::post('/', 'store');
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'destroy');
    });


Route::controller(ChapterController::class)
    ->prefix('chapters')
    ->group(function () {
        Route::get('/', 'index');
        Route::get('/{id}', 'show');
        Route::post('/', 'store');
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'destroy');
    });

Route::controller(LessonController::class)
    ->prefix('lessons')
    ->group(function () {
        Route::get('/', 'index');
        Route::get('/{id}', 'show');
        Route::post('/', 'store');
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'destroy');
    });

Route::controller(ImageCourseController::class)
    ->prefix('image-courses')
    ->group(function () {
        Route::post('/', 'store');
        Route::delete('/{id}', 'destroy');
    });

Route::controller(MyCourseController::class)
    ->prefix('my-courses')
    ->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::post('/premium', 'createPremiumAccess');
    });

Route::controller(ReviewController::class)
    ->prefix('reviews')
    ->group(function () {
        Route::post('/', 'store');
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'destroy');
    });
