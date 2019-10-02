import React from "react";
import css from "./control.css";

const control = props => (
  <div className="Control">
    <div className="Label">{props.label} </div>
    <button className="Less" onClick={props.removed} disabled={props.disabled}>
      Less
    </button>
    <button className="More" onClick={props.added}>
      {" "}
      More
    </button>
  </div>
);

export default control;
