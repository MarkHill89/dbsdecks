<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index(Request $request, AuthService $authService){
        $users = User::all();

        return $users->toJson();
        
    }
}
