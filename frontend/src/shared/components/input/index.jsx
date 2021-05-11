import React from 'react'
import './Input.scss';

const Input = ({placeholder}) => {
    return (
        <>
            <input classname="input" placeholder={placeholder}/>
        </>
    )
}

export default Input;
