import React, { useEffect, useState } from 'react';
import './Preferences.scss';
import { Slider, InputDropdown, Input, Switch } from '../../shared/components/';
import { OPTIONS, PREFERENCES } from '../../shared/services/preferences';

const Preferences = () => {
  const [options, setOptions] = useState(),
        [defaults, setDefaults] = useState();

  useEffect(() => {
    OPTIONS().then((options) => setOptions(options));
    PREFERENCES().then((options) => setDefaults(options));
  }, []);

  return (
    <div className="preferences">
      <h1>
        Setup Preferences
      </h1>

      <div className="container" >

        <InputDropdown
          placeholder="Search games"
          type="game"
          data={options?.games}
          defaults={defaults?.games}
        />

        <h2>When do you play</h2>

        <Slider
          name="weekday"
          defaults={defaults?.times}
        />

        <Slider
          name="weekend"
          defaults={defaults?.times}
        />

        <h2>
          Appealing genres
        </h2>

        <InputDropdown
          placeholder="Search genres"
          type="genre"
          data={options?.genres}
          defaults={defaults?.genres}
        />

        <h2>
          Type of player
        </h2>

        {options?.player_types.map((type) => (
          <Switch
            type="player_type"
            data={type}
            defaults={defaults?.player_types}
          />
        ))}

        <h2>
          Preferred languages
        </h2>

        <InputDropdown
          placeholder="Search languages"
          type="lang"
          data={options?.langs}
          defaults={defaults?.langs}
        />

        <h2>
          Optional
        </h2>

        {options?.miscs.map((misc) => (
          <Switch
            type="misc"
            data={misc}
            defaults={defaults?.miscs}
          />
        ))}

      </div>
    </div>
  )
}

export default Preferences;
