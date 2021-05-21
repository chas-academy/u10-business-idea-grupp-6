<?php

namespace App\Http\Controllers;

use App\Events\MsgReadEvent;
use App\Events\PrivateChatEvent;
use App\Http\Resources\ChatResource;
use App\Models\Session;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;

class ChatController extends Controller
{
    public function send(Session $session, Request $request)
    {
        $message = $session->messages()->create([
            'content' => $request->content,
        ]);

        $chat = $message->createForSend($session->id, auth('sanctum')->user()->id);

        $messageForReceive = $message->createForReceive($session->id, $request->to_user);

        broadcast(new PrivateChatEvent($message->content, $chat));
        // broadcast(new PrivateChatEvent($messageForReceive, $chat));

        return response($message, 200);
    }

    public function chats(Session $session)
    {
        return ChatResource::collection($session->chats->where('user_id', auth('sanctum')->user()->id));
    }

    public function read(Session $session)
    {
        $chats = $session->chat->where('read_at', null)->where('type', 0)->where('user_id', '!=', auth('sanctum')->user()->id);
        foreach ($chats as $chat) {
            $chat->update(['read_at', Carbon::now()]);
            broadcast(new MsgReadEvent(new ChatResource($chat), $chat->session_id));
        }
    }

    public function clear(Session $session)
    {
        $session->deleteChats();
        $session->chats->count() == 0 ? $session->deleteMessages() : '';
        return response('cleared', 200);
    }
}
