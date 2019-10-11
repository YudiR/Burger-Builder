import React from "react";
import Burger from "../../Burger/burger";
import Button from '../../ui/button/button'
import css from './checkoutSummary.css'
const checkoutSummary = props => {
  return (
    <div className = 'CheckoutSummary'>
      <h1>Hope you enjoy!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} /> 
      </div>
      <Button clicked={props.cancel} btnType='Danger'>Cancel</Button>
      <Button clicked={props.continue} btnType='Success'> Continue </Button>
    </div>
  );
};
export default checkoutSummary;
