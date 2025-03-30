<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\SkillController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register'])->name('register');

Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::post('/logout', [AuthController::class, 'logout'])
    ->middleware('auth:sanctum')
    ->name('logout');

Route::post('/book/create', [BookController::class, 'store'])
    ->middleware('auth:sanctum')
    ->name('book.create');

Route::post('/skill/create', [SkillController::class, 'store'])
    ->middleware('auth:sanctum')
    ->name('skill.create');
Route::get('/skill', [SkillController::class, 'getSkill'])
    ->middleware('auth:sanctum')
    ->name('skill.get');

