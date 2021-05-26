import React from "react";
import { Link } from "react-router-dom";
import "./ButtonLink.scss";

const ButtonLink = ({ name, link, classValue, children }) => {
  return (
    <>
      <Link exact to={link} className={classValue}>
        {name}
        {children}
      </Link>
    </>
  );
};

export default ButtonLink;
