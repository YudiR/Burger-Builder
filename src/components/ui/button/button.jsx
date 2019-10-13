import React from 'react'
import css from './button.css'
const button = (props) => (
<button className={[css.Button, props.btnType].join(' ')} disabled={props.disable} onClick={props.clicked}>{props.children}</button>
)

export default button       