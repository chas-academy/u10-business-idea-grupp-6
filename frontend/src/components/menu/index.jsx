import React from "react";
import "./Menu.scss";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons";

const Menu = () => {
  return (
    <>
    <div className="nav-background">
      <div className="nav-container">
        <NavLink exact to="/" className="icon icon-medium" activeClassName="active-link">
          <FontAwesomeIcon icon={faHouseUser} />
        </NavLink>

        <NavLink exact to="/chat" className="icon icon-medium" activeClassName="active-link">
          <FontAwesomeIcon icon={faCommentDots} />
        </NavLink>

        <NavLink exact to="/edit-profile" className="icon icon-medium" activeClassName="active-link">
          <FontAwesomeIcon icon={faUserCircle} />
        </NavLink>
      </div>
    </div>
    </>
  );
};

export default Menu;
