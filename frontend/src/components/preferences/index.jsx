import React, { useEffect, useState } from 'react';
import './Preferences.scss';
import { Slider, InputDropdownMulti, Switch, ProfileMenu } from "../../shared/components/";
import { OPTIONS, PREFERENCES } from "../../shared/services/preferences";
import { LoadingInput, LoadingSwitch } from "../../shared/loading_components/";

const Preferences = ({ logoutHandler }) => {
  const [options, setOptions] = useState(),
        [defaults, setDefaults] = useState();

  useEffect(() => {
    OPTIONS().then((options) => setOptions(options));
    PREFERENCES().then((options) => setDefaults(options));
  }, []);

  return (
    <div className="preferences">

      <ProfileMenu
        navLink1="/your-profile"
        navLink1Name="Your profile"
        navLink2="/edit-profile"
        navLink2Name="Edit profile"
        navLink3="/change-password"
        navLink3Name="Change password"
        logoutHandler={logoutHandler}
      />

      <h1>
        Setup Preferences
      </h1>

      {options &&
        <div className="container" >

          <h2>
            Favorite games
          </h2>

          <InputDropdownMulti
            placeholder="Search games"
            type="game"
            data={options?.games}
            defaults={defaults?.games}
          />

          <h2>
            When do you play
          </h2>

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

          <InputDropdownMulti
            placeholder="Search genres"
            type="genre"
            data={options?.genres}
            defaults={defaults?.genres}
          />

          <h2>
            Type of player
          </h2>

          {options?.player_types.map((type, idx) => (
            <Switch
              type="player_type"
              data={type}
              key={idx}
              defaults={defaults?.player_types}
            />
          ))}

          <h2>
            Preferred languages
          </h2>

          <InputDropdownMulti
            placeholder="Search languages"
            type="lang"
            data={options?.langs}
            defaults={defaults?.langs}
          />

          <h2>
            Optional
          </h2>

          {options?.miscs.map((misc, idx) => (
            <Switch
              type="misc"
              data={misc}
              key={idx}
              defaults={defaults?.miscs}
            />
          ))}
        </div>
      }

      {!options &&
        <div className="loading">
          <LoadingInput/>
          <LoadingSwitch/>
          <LoadingSwitch/>
          <LoadingInput/>
          <LoadingSwitch/>
          <LoadingSwitch/>
          <LoadingSwitch/>
          <LoadingInput/>
          <LoadingSwitch/>
          <LoadingSwitch/>
        </div>
      }
    </div>
  );
};

export default Preferences;
