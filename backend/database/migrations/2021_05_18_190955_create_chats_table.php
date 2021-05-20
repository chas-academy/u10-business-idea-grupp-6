<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chats', function (Blueprint $table) {
            $table->id();
            // $table->unsignedInteger('message_id');
            // $table->unsignedInteger('session_id');
            // $table->unsignedInteger('user_id');
            $table->foreignId('message_id')->constrained();
            $table->foreignId('session_id')->constrained();
            $table->foreignId('user_id')->constrained();
            $table->dateTime('read_at')->nullable();
            $table->boolean('type'); //0 is for send and 1 is for recieve
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chats');
    }
}
