<?php

namespace Tests\Feature;

use App\Models\User;
use App\Providers\RouteServiceProvider;
use Tests\TestCase;
use Illuminate\Support\Facades\Auth;

class AuthenticationTest extends TestCase
{

    public function test_users_can_login_using_username_and_password()
    {
        $user = User::factory()->create();
        $authAttempt = Auth::attempt(['username' => $user->username, 'password' => 'password']);
        
        if($authAttempt){
            $this->assertTrue(true);
        } else {
            $this->assertTrue(false);
        }

    }
}
