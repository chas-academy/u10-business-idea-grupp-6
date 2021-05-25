import React from 'react';
import './ProfileMenu.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const ProfileMenu = () => {
  return (
    <>
      <button
        className="profile-menu-btn">
        <FontAwesomeIcon icon={faEllipsisH} className='icon icon-medium' />
      </button>
      {/* <div className='nav-container'>
        <NavLink
          exact
          to='/'
          className='icon icon-medium'
          activeClassName='active-link'
        >
          <FontAwesomeIcon icon={faEllipsisH} />
        </NavLink>

        <NavLink
          exact
          to='/chat'
          className='icon icon-medium'
          activeClassName='active-link'
        >
          <FontAwesomeIcon icon={faCommentDots} />
        </NavLink>

        <NavLink
          exact
          to='/edit-profile'
          className='icon icon-medium'
          activeClassName='active-link'
        >
          <FontAwesomeIcon icon={faUserCircle} />
        </NavLink>
      </div> */}
    </>
  );
};

export default ProfileMenu;
