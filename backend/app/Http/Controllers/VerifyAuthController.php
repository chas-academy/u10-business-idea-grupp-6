<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VerifyAuthController extends Controller
{
    public $user;

    public function __construct()
    {
        $this->user = auth('sanctum')->user();
    }

    public function __invoke()
    {
        return response(200);
    }
}
