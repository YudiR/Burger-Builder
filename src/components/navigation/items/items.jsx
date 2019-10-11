import React from 'react'
import css from './items.css'
import Item from '../item/item'
const navigation  = (props) => (

    <ul className = "Items">
        <Item link = '/' > Burger Builder</Item>
        <Item link = '/orders' > Orders</Item>

    </ul>

)

export default navigation