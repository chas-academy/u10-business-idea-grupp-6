import {React} from 'react'
import StylesApi from './StylesApi';
import './Styles.scss';
import Shared, {
    ButtonSubmit, 
    ButtonLink, 
    Input, 
    InputDropdown, 
    InputPassword
} from '../../shared/components/'

const Styles = () => {
    return (
        <>
            <ButtonSubmit name="Button" />
        </>
    )
}

export default Styles;