import React from "react";
import "./Menu.scss";
import { ButtonLink } from "../../shared/components/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons";

const Menu = () => {
  return (
    <>
      <div className="nav-container">
        <ButtonLink link="/" classValue="home">
          <FontAwesomeIcon icon={faHouseUser} className="icon icon-medium" />
        </ButtonLink>

        <ButtonLink link="/chat" classValue="chat">
          <FontAwesomeIcon icon={faCommentDots} className="icon icon-medium" />
        </ButtonLink>

        <ButtonLink link="/edit-profile" classValue="user">
          <FontAwesomeIcon icon={faUserCircle} className="icon icon-medium" />
        </ButtonLink>
      </div>
    </>
  );
};

export default Menu;
