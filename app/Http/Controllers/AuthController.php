<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|email',
            'password' => 'required|string'
        ]);
        $user = User::where('username');

        if (!$user || !Hash::check($request->password, $user->password)) {
            return abort(400, "Invalid Credentials");
        }
        return response()->json($user->createToken('auth')->plainTextToken);

    }
}
