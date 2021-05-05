<?php

namespace Database\Seeders;

use App\Models\Game;
use App\Models\Genre;
use App\Models\Lang;
use App\Models\Misc;
use App\Models\PlayerType;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {   
        \App\Models\Role::create(['role' => 'basic']);
        \App\Models\Role::create(['role' => 'admin']);
        \App\Models\User::create([  
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            // 'remember_token' => Str::random(10)
        ])->roles()->attach(2);

        \App\Models\User::factory(10)->create();


        //---------------------------------------TESTS
            Genre::create(['genre' => 'action']);
            Genre::create(['genre' => 'mmo']);

            Game::create(['game' => 'Hitman 2', 'genre_id' => 1]);
            Game::create(['game' => 'Habbo Hotel', 'genre_id' => 2]);

            PlayerType::create(['type' => 'casual']);
            PlayerType::create(['type' => 'competetive']);
            PlayerType::create(['type' => 'medium']);

            Lang::create(['lang_eng' => 'Swedish', 'native' => 'Svenska', 'code' => 'SE']);
            Lang::create(['lang_eng' => 'Arabic', 'native' => 'عربى', 'code' => 'AR']);
            Lang::create(['lang_eng' => 'English', 'native' => 'English', 'code' => 'ENG']);

            Misc::create(['misc' => 'Non-aggressive language']);
            Misc::create(['misc' => 'Flexible times']);

            foreach(User::all() as $user)
            {
                $user->genres()->attach(rand(1, 2));
                $user->games()->attach(rand(1, 2));
                
                for($i = 0; $i <= rand(0, 2); $i++)
                {
                    $user->player_types()->attach($i+1);
                }

                for($i = 0; $i <= rand(0, 2); $i++)
                {
                    $user->langs()->attach($i+1);
                }

                $num = rand(0, 2);
                if($num) $user->miscs()->attach($num);

            }






        // ----------------------------------------TESTS
    }
}
