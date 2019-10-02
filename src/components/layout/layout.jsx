import React from 'react'
import Aux from '../../hoc/Aux'
import css from './Layout.css'
const layout = (props) => ( 
    <Aux>
    <div>
        Toolbar , sideDrawer . backdrop
        </div>
        <main className="contentLayout">
            {props.children}
        </main>
        </Aux>
)

export default layout