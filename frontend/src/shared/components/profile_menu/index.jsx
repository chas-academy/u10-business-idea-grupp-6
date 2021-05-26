import React from 'react';
import './ProfileMenu.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const ProfileMenu = () => {
  return (
    <>
      <button
        className="profile-menu-btn">
        <FontAwesomeIcon
          icon={faEllipsisH}
          className='icon icon-medium'
        />
      </button>
    </>
  );
};

export default ProfileMenu;
