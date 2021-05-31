<?php

namespace Tinder\TinderGamers;

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
            Nova::theme(asset('/tinder/tinder-gamers/theme.css'));
        });

        $this->publishes([
            __DIR__.'/../resources/css' => public_path('tinder/tinder-gamers'),
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
