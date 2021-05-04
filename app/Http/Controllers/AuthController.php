<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\Hash;

use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function username()
    {
        return 'username';
    }

    public function check(Request $request)
    {
        
        if (Auth::check()) {
            return response(true);
        } else {
            return response(false);
        }
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

        $token = $user->createToken('dbs decks')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token,
        ];

        return response($response, 201);
    }

    public function login(Request $request)
    {   

        $fields = $request->all();
        
        $username = $fields['formValue']['username'];
        $password = $fields['formValue']['password'];

        $user = User::where('username', $username)->first();
        
        if(!$user){
            return response([
                'message' => "Username not found"
            ], 401);
        }
        
        // Check Password is md5
        if ($user->password == hash('md5', $password))
        {
            $user->password = bcrypt($request->input('password'));
            $user->save();
        }
           
        

        // Check Password is updated
        if (Auth::attempt(['username' => $username, 'password' => $password]))
        {
            $token = $user->createToken("dbs decks")->plainTextToken;
            $response = ['token' => $token];
            return response($response, 201);
        } else {
            return response([
                'message' => "Invalid Credentials"
            ], 401);
        }

        

    }
    
     /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'Successfully logged out'
        ];

    }

    public function user(Request $request)
    {
        return $request->user();
    }
    
}
