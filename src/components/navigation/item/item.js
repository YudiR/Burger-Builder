import React from "react";
import css from "./item.css";
const item = props => (
  <li className="Item">
    <a className={props.active ? 'active' : null} href={props.link}>{props.children}</a>
  </li>
);
export default item
