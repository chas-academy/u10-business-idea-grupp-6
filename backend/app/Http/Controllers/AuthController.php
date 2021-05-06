<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Validator;

class AuthController extends Controller
{
    public function register(Request $request){

        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed',
        ]);

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password'])
        ]);

        $token = $user->createToken('apptoken')->plainTextToken;

        $respone = [
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'bearer',
        ];

        return response($respone, 201);
    }

    public function login(Request $request){
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        //Check Email
        $user = User::where('email', $fields['email'])->first();

        //Check Password
        if(!$user || !Hash::check($fields['password'], $user->password)){
            return response([
                'message' => 'Bad creds'
            ], 401);
        }

        $token = $user->createToken('apptoken')->plainTextToken;

        $respone = [
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'bearer',
        ];

        return response($respone, 201);
    }

    public function logout(){
        auth()->user()->tokens->delete();

        return [
            'message' =>  'Logged out'
        ];
    }

    public function destroy()
    {
        User::destroy(auth()->user()->id);

        return [
            'message' =>  auth()->user()->id
        ];
    }

    public function show()
    {
        return response()->json(auth()->user());
    }
}
