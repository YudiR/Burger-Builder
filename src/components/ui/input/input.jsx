import React from "react";
import css from "./input.css";
const input = props => {
  let inputElement = null;
  let classes = ["InputElement"]

  if (props.invalid && props.shouldValidate && props.touched) {
    classes.push('Invalid')
  }



  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className= {classes.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.change}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className= {classes.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.change}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className= {classes.join(' ')}
          value={props.value}
          onChange={props.change}
        >
                      {props.elementConfig.options.map(option => (
                          <option key={option.value} value={option.value}>
                              {option.display}
                          </option>
                      ))}

        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className= {classes.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.change}
        />
      );
  }

  return (
    <div className="Input">
      <label className="Label">{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
