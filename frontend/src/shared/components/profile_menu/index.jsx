import React, { useState } from 'react';
import './ProfileMenu.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Modal } from '../index';
import { GET } from '../../services/requests';

const ProfileMenu = ({navLink1, navLink1Name, navLink2, navLink2Name, navLink3, navLink3Name}) => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('token')),
        [authLoading, setAuthLoading] = useState(false);

  const logout = () => {
    setAuthLoading(true);
    GET('logout')
      .then((data) => {
        setAuthLoading(false);
        setIsAuth(null);

        localStorage.removeItem('token');
        localStorage.removeItem('user_id');

        window.location.reload();
      })
      .catch((e) => {
        setAuthLoading(false);
        setIsAuth(null);

        window.location.reload();
      });
  };
  
  const openMenuBtn = (
    <FontAwesomeIcon
      icon={faEllipsisH}
      className="icon icon-medium"
    />
  );

  const modalMenu = (
    <>
      <NavLink
        exact
        to={navLink1}
        className='navlink'
        activeClassName='navlink'
      >
        {navLink1Name}
      </NavLink>

      <NavLink
        exact
        to={navLink2}
        className='navlink'
        activeClassName='navlink'
      >
        {navLink2Name}
      </NavLink>

      <NavLink
        exact
        to={navLink3}
        className='navlink'
        activeClassName='navlink'
      >
        {navLink3Name}
      </NavLink>

      <NavLink
        exact
        to='/'
        className='navlink'
        activeClassName='navlink'
        onClick={logout}
      >
        Log out
      </NavLink>
    </>
  );


  return (
    <>
      <Modal
        modalContent={modalMenu}
        openBtnClass="profile-menu-btn"
        closeBtnClass="hidden-btn"
        openBtnText={openMenuBtn}
        closeBtnText=""
        modalClass="menu-modal"
        modalOverlayClass="menu-modal-overlay"
      />
    </>
  );
};

export default ProfileMenu;
