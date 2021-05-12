import React from 'react'
import { Link } from 'react-router-dom';
import './ButtonLink.scss'

const ButtonLink = ({name, link}) => {
    return (
        <>
            <Link to={link} className="button-link" >{name}</Link>
        </>
    )
}

export default ButtonLink;
