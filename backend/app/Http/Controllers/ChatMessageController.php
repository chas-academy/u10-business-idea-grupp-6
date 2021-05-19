<?php

namespace App\Http\Controllers;

use App\Events\ChatMessageSent;
use App\Models\ChatMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatMessageController extends Controller
{

    public function __construct()
    {
        //
    }

    /**
     * Show chats
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Fetch all messages
     *
     * @return Message
     */
    public function getMessage()
    {
        return ChatMessage::with('user')->get();
    }

    /**
     * Persist message to database
     *
     * @param  Request $request
     * @return Response
     */
    public function sendMessage(Request $request)
    {
        $user = Auth::user();

        $message = $user->messages()->create([
            'message' => $request->input('message')
        ]);

        broadcast(new ChatMessageSent($user, $message))->toOthers();

        return ['status' => 'Message Sent!'];
    }
}
