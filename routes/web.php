<?php

use App\Http\Controllers\AlternatifController;
use App\Http\Controllers\KriteriaController;
use App\Http\Controllers\PerhitunganController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TopsisController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'status' => session('status'),
    ]);
})->middleware('guest');

Route::middleware('auth')->group(function () {
    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::middleware('can:admin')->group(function () {
        Route::get('/admin/dashboard', function () {
            return Inertia::render('Admin/Dashboard');
        })->name('admin.dashboard');

        Route::resource('users', UserController::class)->except('create', 'store', 'destroy');

        Route::resource('kriteria', KriteriaController::class)->except('show')->parameters(['kriteria' => 'kriteria']);
    });

    Route::resource('alternatif', AlternatifController::class)->except('show');

    // TOPSIS
    Route::get('topsis', [PerhitunganController::class, 'topsis'])->name('topsis');
});

require __DIR__ . '/auth.php';
