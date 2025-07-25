<?php

use App\Http\Controllers\Auth\CustomRegisteredUserController;
use App\Http\Controllers\DataController;
use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Ruta principal (accesible para todos)
Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

// Rutas de autenticación estándar (login/register)
require __DIR__.'/auth.php';

// Rutas de registro personalizado (solo para invitados)
// Route::middleware('guest')->group(function () {
//     Route::get('/register-custom', [CustomRegisteredUserController::class, 'create'])->name('register-custom');
//     Route::post('/register-custom/step1', [CustomRegisteredUserController::class, 'storeStep1'])->name('register-custom.step1');
//     Route::post('/register-custom/step2', [CustomRegisteredUserController::class, 'storeStep2'])->name('register-custom.step2');
// });

// Rutas protegidas (solo para autenticados)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/application', function () {
        return Inertia::render('Application/Index');
    })->name('application');

    Route::get('/application/create', function () {
        return Inertia::render('Application/Create');
    })->name('');

    Route::get('/application/offers', function () {
        return Inertia::render('Application/CreditsOffers');
    })->name('');

     Route::get('/company', function () {
        return Inertia::render('Company/Index');
    })->name('company');

    Route::get('/documents', function () {
        return Inertia::render('Documents');
    })->name('documents');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/upload', [FileUploadController::class, 'upload'])->name('upload');
    Route::post('/save-data', [DataController::class, 'store'])->name('save-data');
    Route::get('/get-company-data', [DataController::class, 'getCompanyData'])->name('get-company-data');
});

// Ruta del dashboard (protegida)
Route::middleware(['auth', 'verified'])->get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');