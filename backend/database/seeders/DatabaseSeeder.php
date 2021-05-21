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
        ])->roles()->attach(2);

        \App\Models\User::factory(150)->create();


        //---------------------------------------TESTS
            Genre::create(['genre' => 'action']);
            Genre::create(['genre' => 'mmo']);
            Genre::create(['genre' => 'fps']);
            Genre::create(['genre' => 'arpg']);

            Game::create(['game' => 'Hitman 2', 'genre_id' => 1]);
            Game::create(['game' => 'World of Warcraft', 'genre_id' => 2]);
            Game::create(['game' => 'Diablo 3', 'genre_id' => 4]);
            Game::create(['game' => 'Call of Duty 3', 'genre_id' => 3]);
            Game::create(['game' => 'Splinter Cell', 'genre_id' => 1]);
            Game::create(['game' => 'Goat Simulator', 'genre_id' => 2]);
            Game::create(['game' => 'Path of Exile', 'genre_id' => 4]);

            PlayerType::create(['player_type' => 'casual']);
            PlayerType::create(['player_type' => 'competetive']);
            PlayerType::create(['player_type' => 'medium']);

            Lang::create(['lang' => 'Swedish', 'native' => 'Svenska', 'code' => 'SE']);
            Lang::create(['lang' => 'Arabic', 'native' => 'عربى', 'code' => 'AR']);
            Lang::create(['lang' => 'English', 'native' => 'English', 'code' => 'ENG']);

            Misc::create(['misc' => 'Non-aggressive language']);
            Misc::create(['misc' => 'Flexible times']);

            foreach(User::all() as $user)
            {
                for($i = 0; $i <= rand(0, 2); $i++)
                {
                    $num = rand(1,4);

                    if($user->genres()->where('genre_id', $num)->get()->count() === 0)
                        $user->genres()->attach($num);

                    $gameNum = rand(1, 7);
                    
                    if($user->games()->where('game_id', $gameNum)->get()->count() === 0)
                        $user->games()->attach($num);
                }
                
                for($i = 0; $i <= rand(0, 2); $i++)
                {
                    $user->player_types()->attach($i+1);
                }

                for($i = 0; $i <= rand(0, 2); $i++)
                {
                    $user->langs()->attach($i+1);
                }

                for($i = 0; $i <= rand(0, 1); $i++)
                {
                    $selected = rand(0,1);
                    if($selected>0 && $user->times()->where('interval', 'weekday')->get()->count() === 0)
                    {
                        
                        $weekday = \App\Models\Time::create([
                            'interval' => 'weekday',
                            'from' => rand(0,23),
                            'to' => rand(0,23),
                            'user_id' => $user->id 
                        ]);
                    }
                    else if ( $selected===0 && $user->times()->where('interval', 'weekend')->get()->count() === 0){
                        $weekend = \App\Models\Time::create([
                            'interval' => 'weekend',
                            'from' => rand(0,23),
                            'to' => rand(0,23) ,
                            'user_id' => $user->id
                        ]);
                    }
                }

                $num = rand(0, 2);
                if($num) $user->miscs()->attach($num);
            }
    }
}
