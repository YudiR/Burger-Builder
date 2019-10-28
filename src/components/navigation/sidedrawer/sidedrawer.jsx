import React from 'react'
import Logo from '../../logo/logo'
import Navigation from '../items/items'
import css from './sidedrawer.css'
import Backdrop from '../../ui/backdrop/backdrop'
import Aux from '../../../hoc/Aux/Aux'
const sideDrawer = (props) => {
    let classes = ['SideDrawer', 'Close']
    if (props.show){
        classes = ['SideDrawer', 'Open']
    }
    return(

        <Aux>
            <Backdrop show={props.show} clicked={props.closed}/>
        <div className = {classes.join(' ')} onClick={props.closed}>
            <div className = 'SideDrawerLogo'>
            <Logo/>
            </div>
            <nav>
                <Navigation isAuthenticated={props.isAuth}/>
            </nav>
        </div>
        </Aux>
    )
}

export default sideDrawer