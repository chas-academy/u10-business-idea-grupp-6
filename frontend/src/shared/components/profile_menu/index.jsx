import React from 'react';
import './ProfileMenu.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Modal } from '../index';

const ProfileMenu = ({navLink1, navLink1Name, navLink2, navLink2Name}) => {
  const openMenuBtn = (
    <FontAwesomeIcon
      // id="profileMenu"
      icon={faEllipsisH}
      className="icon icon-medium"
    />
  );

  // const profileMenu = document.querySelector('#profileMenu');
  // const menuModal = document.querySelector('.menu-modal')
  // menuModal.appendChild(profileMenu);

  const modalMenu = (
    <>
      <NavLink
        exact
        to={navLink1}
        className="navlink"
        activeClassName="navlink"
      >
        {navLink1Name}
      </NavLink>

      <NavLink
        exact
        to={navLink2}
        className="navlink"
        activeClassName="navlink"
      >
        {navLink2Name}
      </NavLink>

      <NavLink
        exact
        to="/login"
        className="navlink"
        activeClassName="navlink"
      >
        Log out (placeholder)
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
