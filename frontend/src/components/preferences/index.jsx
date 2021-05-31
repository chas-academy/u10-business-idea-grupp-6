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

          <label>
            <InputDropdownMulti
              placeholder="Search games"
              type="game"
              data={options?.games}
              defaults={defaults?.games}
            />
          </label>

          <h2>
            When do you play
          </h2>

          <label>
            <Slider

              name="weekday"
              defaults={defaults?.times}
            />
          </label>

          <label>
            <Slider

              name="weekend"
              defaults={defaults?.times}
            />
          </label>

          <h2>
            Appealing genres
          </h2>

          <label>
            <InputDropdownMulti
              placeholder="Search genres"
              type="genre"
              data={options?.genres}
              defaults={defaults?.genres}
            />
          </label>

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

          <label>
            <InputDropdownMulti
              placeholder="Search languages"
              type="lang"
              data={options?.langs}
              defaults={defaults?.langs}
            />
          </label>

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
          <LoadingInput></LoadingInput>
          <LoadingSwitch></LoadingSwitch>
          <LoadingSwitch></LoadingSwitch>
          <LoadingInput></LoadingInput>
          <LoadingSwitch></LoadingSwitch>
          <LoadingSwitch></LoadingSwitch>
          <LoadingSwitch></LoadingSwitch>
          <LoadingInput></LoadingInput>
          <LoadingSwitch></LoadingSwitch>
          <LoadingSwitch></LoadingSwitch>
        </div>
      }
    </div>
  );
};

export default Preferences;
