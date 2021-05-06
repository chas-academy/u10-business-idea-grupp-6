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
            Genre::create(['genre' => 'fps']);
            Genre::create(['genre' => 'arpg']);

            Game::create(['game' => 'Hitman 2', 'genre_id' => 1]);
            Game::create(['game' => 'World of Warcraft', 'genre_id' => 2]);
            Game::create(['game' => 'Diablo 3', 'genre_id' => 4]);
            Game::create(['game' => 'Call of Duty 3', 'genre_id' => 3]);
            Game::create(['game' => 'Splinter Cell', 'genre_id' => 1]);
            Game::create(['game' => 'Goat Simulator', 'genre_id' => 2]);
            Game::create(['game' => 'Path of Exile', 'genre_id' => 4]);

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
                for($i = 0; $i <= rand(0, 2); $i++)
                {
                    $num = rand(1,4);
                    if($user->genres()->where('genre_id', $num)->get()->count() === 0)
                        $user->genres()->attach($num);
                    $gameNum = rand(1, 7);
                    if($user->games()->where('game_id', $gameNum)->get()->count() === 0)
                        $user->games()->attach($num);
                }
                
                // $user->games()->attach(rand(1, 7));
                
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

            // $types = $user->player_types->map(function($i){return $i->id;});
            // this query filters for any number of player types, at least one match
            // It is dependent on an array of ids
            // User::with('genres', 'games', 'player_types', 'langs', 'miscs')->whereHas('player_types', function ($q) use($types) { foreach($types as $type) { $q->orWhere('player_types.id', $type); } ; })->get();

            // this is better
            // User::with('genres', 'games', 'player_types', 'langs', 'miscs')->whereHas('player_types', function ($q) use($types)  { $q->where('player_types.id', $types); })->get();


            // this filters on language and player type
            // User::with('player_types', 'langs')->whereHas('player_types', function ($q) use($types)  { $q->where('player_types.id', $types); })->whereHas('langs', function ($q) use ($langs) { $q->where('langs.id', $langs); })->get(); 


            // this filters on languages, player_types and miscs
            // User::with('player_types', 'langs', 'miscs')->whereHas('player_types', function ($q) use($types)  { $q->where('player_types.id', $types); })->whereHas('langs', function ($q) use ($langs) { $q->where('langs.id', $langs); })->whereHas('miscs', function ($q) use ($miscs) { $q->where('miscs.id', $miscs); })->get();

            

        // ----------------------------------------TESTS
    }
}
