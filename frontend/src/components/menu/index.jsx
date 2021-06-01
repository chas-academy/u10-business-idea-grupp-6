import React from 'react';
import './Menu.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faUserCircle, faGamepad } from '@fortawesome/free-solid-svg-icons';

const Menu = () => {

  const urls = [
    '/verify',
    '/verified',
    '/already-verified',
  ];

  return (
    <div className="menu">
      {!urls.includes(window.location.pathname) &&
        <div>
          <NavLink
            exact
            to="/"
            className="icon icon-medium"
            activeClassName="active-link"
            aria-label="nav-link"
          >
            <FontAwesomeIcon
              icon={faGamepad}
            />
          </NavLink>

          <NavLink
            exact
            to="/chat"
            className="icon icon-medium"
            activeClassName="active-link"
            aria-label="nav-link"
          >
            <FontAwesomeIcon
              icon={faCommentAlt}
            />
          </NavLink>

          <NavLink
            exact
            to="/edit-profile"
            className="icon icon-medium"
            activeClassName="active-link"
            aria-label="nav-link"
          >
            <FontAwesomeIcon
              icon={faUserCircle}
            />
          </NavLink>
        </div>
      }
    </div>
  );
};

export default Menu;
