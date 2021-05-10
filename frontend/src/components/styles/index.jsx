import {React} from 'react'
import './Styles.scss';

export default function Styles() {
    return (
        <>
            <p className="text-xl">Extra Large!</p>
            <p className="text-lg">Large</p>
            <p className="text-md">Medium</p>
            <p className="text-sm">Small</p>
            <p className="text-xs">Extra Small</p>
            <div className="flex">
                <input type="text" className="input" placeholder="Input"/>
                <input type="password"className="input" placeholder="Hidden"/>
                <input className="input" placeholder="Drop Down"/>
            </div>
            <button className="button-dark">Button Dark</button>
            <button className="button-light">Button Light</button>
            <button className="sign-up">Sign up</button>
            <button className="sign-in">Sign in</button>
        </>
    )
}
