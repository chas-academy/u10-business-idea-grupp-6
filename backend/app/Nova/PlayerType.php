<?php

namespace App\Nova;

use Illuminate\Http\Request;
use Laravel\Nova\Fields\Gravatar;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Password;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\BelongsToMany;
use Laravel\Nova\Fields\HasOne;
use Laravel\Nova\Fields\HasMany;
use Laravel\Nova\Fields\Select;
use Laravel\Nova\Http\Requests\NovaRequest;

class PlayerType extends Resource
{
    public static $group = 'App Settings';
    /**
     * The model the resource corresponds to.
     *
     * @var string
     */
    public static $model = \App\Models\PlayerType::class;

    /**
     * The single value that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public static $title = 'player_type';

    /**
     * The relationships that should be eager loaded on index queries.
     *
     * @var array
     */
    public static $with = ['users'];

    /**
     * The columns that should be searched.
     *
     * @var array
     */
    public static $search = [
        'id', 'player_type'
    ];

    /**
     * Get the fields displayed by the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function fields(Request $request)
    {
        return [
            ID::make(__('ID'), 'id')->sortable(),

            Text::make('Player_Type')
                ->sortable()
                ->rules('required', 'max:255'),

            BelongsToMany::make('Users')->sortable(),
        ];
    }

    /**
     * Get the cards available for the request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function cards(Request $request)
    {
        return [];
    }

    /**
     * Get the filters available for the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function filters(Request $request)
    {
        return [];
    }

    /**
     * Get the lenses available for the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function lenses(Request $request)
    {
        return [];
    }

    /**
     * Get the actions available for the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function actions(Request $request)
    {
        return [];
    }
}
