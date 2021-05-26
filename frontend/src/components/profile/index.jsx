import React, { useEffect } from 'react';
import './Profile.scss';
import ProfileData from '../../shared/components/profile_data';

const Profile = (props) => {

  useEffect(() => {
    if(!props.location.data) return window.history.back();
  },[]);

  return (
    <div className="profile">
      {props.location.data && <ProfileData
        data={props.location.data?.data.profile}
        preferences={props.location.data?.data.preferences}
      />}
    </div>
  )
}

export default Profile;
