import React from 'react'
import css from './items.css'
import Item from '../item/item'
const navigation  = (props) => (

    <ul className = "Items">
        <Item link = '/' active> Burger Builder</Item>
        <Item link = '/' > Checkout</Item>

    </ul>

)

export default navigation