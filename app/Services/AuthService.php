<?php


namespace App\Services;

use App\Helpers\Proc;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class AuthService
{
    public function getAllUsers(){
        return collect(DB::select('select * from users'))
        ->map(function ($row) {
            return [
                "id" => $row != null ? $row->id:null,
                "username" => $row != null ? $row->username: null,
                "name" => $row != null ? $row->name: null,
                "email" => $row != null ? $row->email : null,
                "email_verified_at" => $row != null ? $row->email_verified_at : null,
                "password" => $row != null ? $row->password : null,
                "remember_token" => $row != null ? $row->remember_token : null,
                "created_at" => $row != null ? $row->created_at : null
            ];
        });
    }
}