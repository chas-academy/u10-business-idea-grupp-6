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
            {/* <ButtonSubmit name="Default Button" />
            <ButtonLink name="Redirect to /" link="/" />
            <Input placeholder="Input"/>
            <InputPassword placeholder="Password"/> */}
            <InputDropdown/>
        </>
    )
}

export default Styles;