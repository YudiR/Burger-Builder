import React from "react";
import css from "./item.css";
import {NavLink} from 'react-router-dom'
const item = props => (
  <li className="Item">
    <NavLink exact  to={props.link}>{props.children}</NavLink>
  </li>
);
export default item
