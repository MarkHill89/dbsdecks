<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');
        
        if(Auth::attempt(['username' => $credentials['username'], 'password' => md5($credentials['password'])], $remember = true)) {
            $request->session()->regenerate();
            return true;
        }else {
            return "0";
        }
        return false;

    }
}
