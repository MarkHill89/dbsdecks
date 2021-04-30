<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function username()
    {
        return 'username';
    }

    public function register(Request $request)
    {
        $allFields = $request->all();
        $fields = $request->validate([
            'credentials.firstName' => 'required|string',
            'credentials.lastName' => 'required|string',
            'credentials.userName' => 'required|string|unique:users,username',
            'credentials.password' => 'required|string|confirmed',
            'credentials.password_confirmation' => 'required|string',
            'credentials.emailAddress' => 'required|string|confirmed|unique:users,email',
            'credentials.emailAddress_confirmation' => 'required|string',            
        ]);


        $user = User::create([
            'name' => $allFields['credentials']['firstName'] . ' ' . $allFields['credentials']['lastName'],
            'username' => $allFields['credentials']['userName'], 
            'email' => $allFields['credentials']['emailAddress'],
            'password'=> bcrypt($allFields['credentials']['password'])
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
        // Check Password is md5
        if ($user->password == hash('md5', $fields['password'])) {
            $user->password = bcrypt($request->input('password'));
            $user->save();
        }
           
        

        // Check Password is updated
        if (Auth::attempt(['username' => $fields['username'], 'password' => $fields['password']]))
        {
            Auth::login($user);
            return response([
                'token' => "validated-creds"
            ], 200);
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
