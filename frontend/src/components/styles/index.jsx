import {React} from 'react'
import './Styles.scss';
import {
    ButtonSubmit, 
    ButtonLink, 
    Input, 
    InputDropdown, 
    InputPassword
} from '../../shared/components/'

const Styles = () => {
    return (
        <>
            <div>
                <ButtonSubmit name="Default Button" />
                <ButtonLink name="Redirect to /" link="/" />
                <Input placeholder="Input"/>
                <InputPassword placeholder="Password"/>
                <InputDropdown/>
            </div>
        </>
    )
}

export default Styles;