<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LangResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'lang' => $this->lang,
            'native' => $this->native,
            'code' => $this->code
        ];
    }
}
