<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request, AuthService $authService){
        return $authService->getAllUsers();
    }
}
