<?php

use Illuminate\Broadcasting\Broadcasters\PusherBroadcaster;
use Illuminate\Support\Str;

class PusherProvider extends PusherBroadcaster
{
    public function validAuthenticationResponse($request, $result)
    {
        if (Str::startsWith($request->channel_name, 'private')) {
            return $this->decodePusherResponse(
                $request, $this->pusher->socketAuth($request->channel_name, $request->socket_id)
            );
        }

        $channelName = $this->normalizeChannelName($request->channel_name);

        return $this->decodePusherResponse(
            $request,
            $this->pusher->presenceAuth(
                $request->channel_name, $request->socket_id,
                $this->retrieveUser($request, $channelName)->getAuthIdentifier(), $result
            )
        );
    }
}