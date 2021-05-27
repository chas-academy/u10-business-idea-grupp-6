import React from 'react';
import './Menu.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faCompass, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Menu = () => {
  return (
    <div className="menu">
        <div>
          <NavLink 
            exact 
            to="/match" 
            className="icon icon-medium" 
            activeClassName="active-link"
          >
            <FontAwesomeIcon 
              icon={faCompass} 
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
