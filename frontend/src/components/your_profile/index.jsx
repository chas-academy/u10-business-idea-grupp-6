import React, { useEffect, useState } from 'react';
import './YourProfile.scss';
import ProfileData from '../../shared/components/profile_data';
import { PREFERENCES } from "../../shared/services/preferences";
import { GET } from '../../shared/services/requests';
import { ProfileMenu } from '../../shared/components';
import { LoadingProfileCard } from '../../shared/loading_components';

const YourProfile = ({ logoutHandler }) => {
  const [userData, setUserData] = useState(),
        [preferences, setPreferences] = useState(),
        [loading, setLoading] = useState(false);

  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    setLoading(true);

    GET(`user/${userId}`)
      .then((data) => {
        setUserData(data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    PREFERENCES()
      .then((preferences) => {
        setPreferences(preferences);
        console.log(preferences);
        setLoading(false);
      });

  }, []);

  return (
    <div className="your-profile">
      <ProfileMenu
        navLink1="/edit-profile"
        navLink1Name="Edit profile"
        navLink2="/preferences"
        navLink2Name="Set preferences"
        navLink3="/change-password"
        navLink3Name="Change password"
        logoutHandler={logoutHandler}
      />

      {!loading && userData &&
        <div className="profile">
          <ProfileData
            data={userData}
            preferences={preferences}
          />
        </div>
      }

      {loading &&
        <div className="loading">
          <LoadingProfileCard />
        </div>
      }
    </div>
  );
};

export default YourProfile;