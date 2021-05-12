import React from 'react'
import './Input.scss';

const Input = ({placeholder}) => {
    return (
        <>
            <input className="input" placeholder={placeholder}/>
        </>
    )
}

export default Input;
