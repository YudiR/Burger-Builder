import React from 'react'
import css from './items.css'
import Item from '../item/item'
const navigation  = (props) => (

    <ul className = "Items">
        <Item link = '/' > Burger Builder</Item>
        {props.isAuthenticated ? <Item link = '/orders' > Orders</Item> : null}
       {!props.isAuthenticated ?  <Item link = '/auth' > Authentication</Item> : 
    <Item link = '/logout' > Logout</Item> }

    </ul>

)

export default navigation