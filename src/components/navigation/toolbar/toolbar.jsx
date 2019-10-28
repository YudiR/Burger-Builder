import React from 'react'
import css from './toolbar.css'
import Logo from '../../../components/logo/logo'
import Navigation from '../../navigation/items/items'
import Toggle from '../sidedrawer/toggle/toggle'
const toolbar = (props) => (
    <header className='Toolbar'>
        <Toggle clicked={props.ToggleClicked}/>
<Logo height="80%"/>
<nav className= 'DesktopOnly'>
    <Navigation isAuthenticated ={props.isAuth}/>
</nav>
    </header>

)

export default toolbar