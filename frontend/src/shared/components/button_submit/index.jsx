import React from 'react'
import './ButtonSubmit.scss';

const ButtonSubmit = ({name, submit}) => {
    return (
        <>
            <button className="button-submit" type="button" onClick={submit}>{name}</button>
        </>
    )
}

export default ButtonSubmit;
