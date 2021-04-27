<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string',
            'password' => 'required|string|confirmed'
        ]);

        $user = User::create([
            'name'=> $fields['name'],
            'email' => $fields['email'],
            'password'=> bcrypt($fields['password'])
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token,
        ];

        return response($response, 201);
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string'
        ]);
        
        $user = User::where('username', $fields['username'])->first();
        // Check Password
        if ($user->password == hash('md5', $fields['password'])) {
            $token = $user->createToken('tempToken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];
        
        return response($response, 201);
        } else {
            return response([
                'message' => "Invalid Credentials"
            ], 401);
        }

        

    }

    public function logout(Request $request)
    {
        $user = $request->user();

        auth()->user()->tokens()->delete();


        return response()->json([
            'status_code' => 200,
            'message' => 'Successfully logged'
        ]);
    }
}
