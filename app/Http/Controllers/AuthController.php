<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

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
            return response(201);
        } else {
            return response(401);
        }
    }
    public function updatePassword(Request $request)
    {
        $fields = $request->validate([
            'password' => 'required|string'
        ]);
        $password = $request->input('password');
        $request->user()->password = bcrypt($password);
        $request->user()->save();
        return response(['data' => 'password updated']);
    }

    public function checkUserName(Request $request) {
        $reqUserName = $request->input('userName');

        $user = User::where('username', $reqUserName)->first();

        if(!$user) {
            return response(["message" => 'OK'], 200);
        }
        
        return response(["message" => 'User found'], 200);
    }

    public function checkEmail(Request $request) {
        $email = User::where('email', $request->input('email'))->first();

        if(!$email) {
            return response(["message" => 'OK'], 200);
        }
        return response(["message" => 'Email Found'], 200);
    }

    public function register(Request $request)
    {
        $allFields = $request->all();
        
        $request->validate([
            'credentials.firstName' => 'required|string',
            'credentials.lastName' => 'required|string',
            'credentials.userName' => 'required|string|unique:users,username',
            'credentials.password' => 'required|string',
            'credentials.emailAddress' => 'required|string|unique:users,email'
        ]);

        $user = User::create([
            'name' => $allFields['credentials']['firstName'] . ' ' . $allFields['credentials']['lastName'],
            'username' => $allFields['credentials']['userName'],
            'email' => $allFields['credentials']['emailAddress'],
            'password' => bcrypt($allFields['credentials']['password']),
            'created_at' => now()
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
        
        // Check if user exists, if not return error
        if (!$user) {
            return response([
                'message' => "Username not found"
            ], 401);
        }

        // Check if password is in old md5 format 
        if ($user->password === hash('md5', $password)) {
            $user->password = bcrypt($password);
            $user->save();
        }
        
        // Check if user / Password is valid
        $authAttempt = Auth::attempt(['username' => $username, 'password' => $password]);
        if ($authAttempt) {
            // If valid attempt create token to validate user and login the user.
            $token = $user->createToken("dbs decks")->plainTextToken;
            Auth::login($user);
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
        $request->user()->tokens()->delete();
        

        return [
            'message' => 'Successfully logged out'
        ];
    }

    public function user(Request $request)
    {
        return $request->user();
    }

    public function forgot(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? response(['message' => 'email sent'])
            : back()->withErrors(['email' => __($status)]);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        return $status == Password::PASSWORD_RESET
            ? redirect()->route('/login')->with('status', __($status))
            : back()->withErrors(['email' => [__($status)]]);
    }

    public function resetPasswordToken($token)
    {
        return view('auth.reset-password', ['token' => $token]);
    }
}
