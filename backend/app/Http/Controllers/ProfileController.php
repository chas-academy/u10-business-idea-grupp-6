<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Rules\MatchOldPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    public function __construct()
    {
        $this->user = auth('sanctum')->user();
    }

    public function getProfile(User $user)
    {
        return $user->profile;
    }

    public function getAccount(User $user)
    {
        return $user;
    }

    public function updateProfile(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'display_name' => 'required|unique:profiles',
        ]);

        if($validator->fails())
            return response()->json(['error' => $validator->messages()], 422);

        $user->profile->update($request->all());

        return response(['message' => 'Profile sucessfully updated']);
    }  

    public function updateAccount(Request $request, User $user)
    {   
        $user->update($request->all());

        return response(['message' => 'Account sucessfully updated']);
    }

    public function updatePassword(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'current_password' => ['required', new MatchOldPassword],
            'password' => 'required|string|confirmed|min:8' 
        ]);

        if($validator->fails())
            return response()->json(['error' => $validator->messages()], 422);

        $user->update([
            'password' => Hash::make($request->password)
        ]);

        return response(['message' => 'Password sucessfully updated']);
    }
}
