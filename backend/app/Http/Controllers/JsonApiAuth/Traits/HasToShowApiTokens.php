<?php

namespace App\Http\Controllers\JsonApiAuth\Traits;

use App\Actions\JsonApiAuth\AuthKit;
use App\Models\User;

trait HasToShowApiTokens
{
    /**
     * Here you can customize how to return data on login and register
     * @param $user
     * @param int $code
     * @param bool $showToken
     * @return \Illuminate\Http\JsonResponse
     */
    public function showCredentials($user, $code = 200, $showToken = true)
    {
        $response = [
            'message' => __('json-api-auth.success'),
            'user' => $user,
        ];

        if($showToken) {
            $response['token'] = $this->createToken($user);
        }

        return response()->json($response, $code);
    }

    protected function createToken(User $user)
    {
        $token = $user->createToken('apptoken')->plainTextToken;

        return $token;
    }
}
