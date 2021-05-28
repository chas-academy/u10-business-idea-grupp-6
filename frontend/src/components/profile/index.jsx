import React, { useEffect } from 'react';
import './Profile.scss';
import ProfileData from '../../shared/components/profile_data';

const Profile = (props) => {

  useEffect(() => {
    if(!props.location.data) window.history.back();
  },[props]);

  return (
    <div className="profile">
      {props.location.data && <ProfileData
        data={props.location.data?.user.profile}
        preferences={props.location.data?.user.preferences}
        offset={props.localtion.data?.user.timezone_offset}
      />}
    </div>
  )
}

export default Profile;
