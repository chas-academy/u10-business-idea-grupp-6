<?php

namespace Gamerhub\GamerHub;

use Illuminate\Support\ServiceProvider;
use Laravel\Nova\Nova;

class ThemeServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Nova::booted(function () {
            Nova::theme(asset('/gamerhub/gamer-hub/theme.css'));
        });

        $this->publishes([
            __DIR__.'/../resources/css' => public_path('gamerhub/gamer-hub'),
        ], 'public');
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
