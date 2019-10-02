import React from "react";
import css from "./controls.css";
import Control from "./control/control";
const controlsVar = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const controls = props => {
  return (
    <div className="Controls">
        <p> Current Price <strong>{props.price.toFixed(2)}</strong> </p>
      {controlsVar.map(ctrl => (
        <Control key={ctrl.label} label ={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)} 
        removed ={() => props.ingredientRemoved(ctrl.type)}
        disabled= {props.disabled[ctrl.type]} />
      ))}
      <br/>
      <button disabled={!props.purchasable} className='OrderButton' onClick={props.ordered}>ORDER NOW</button>
    </div>
  );
};

export default controls;
