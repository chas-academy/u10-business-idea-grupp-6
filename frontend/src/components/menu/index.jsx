import React from 'react';
import './Menu.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faUserCircle, faGamepad } from '@fortawesome/free-solid-svg-icons';

const Menu = () => {

  return (
    <div className="menu">
        <div>
          <NavLink
            exact
            to="/"
            className="icon icon-medium"
            activeClassName="active-link"
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
          >
            <FontAwesomeIcon
              icon={faUserCircle}
            />
          </NavLink>
        </div>
    </div>
  );
};

export default Menu;
