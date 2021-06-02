import React, { useEffect, useState } from 'react';
import './YourProfile.scss';
import ProfileData from '../../shared/components/profile_data';
import { GET } from '../../shared/services/requests';
import { ProfileMenu } from '../../shared/components';
import { LoadingProfileCard } from '../../shared/loading_components';

const YourProfile = ({ logoutHandler }) => {
  const [userData, setUserData] = useState(),
        [preferences, setPreferences] = useState(),
        [offset, setOffset] = useState(),
        [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    GET(`user/prefs`).then(data => {
      setUserData(data.data.data.profile);
      setPreferences(data.data.data.preferences);
      setOffset(data.data.data.timezone_offset);
      setLoading(false);
    }).catch(error => {
      setLoading(false);
    })

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
            offset={offset}
          />
        </div>
      }

      {loading &&
        <div className="loading">
          <LoadingProfileCard/>
        </div>
      }
    </div>
  );
};

export default YourProfile;
