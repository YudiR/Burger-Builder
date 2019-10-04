import React from 'react'
import logo from '../../assets/images/burgerLogo.png'
import css from './logo.css'
const Burgerlogo = (props) => (
    <div className='Logo' style ={{height: props.height}}>
<img src={logo}/>
</div>
)

export default Burgerlogo