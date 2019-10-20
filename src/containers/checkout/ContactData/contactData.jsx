import React, { Component } from "react";
import Button from "../../../components/ui/button/button";
import css from "./contactData.css";
import axios from "../../../axios/axios";
import Spinner from "../../../components/ui/spinner/spinner";
import Input from "../../../components/ui/input/input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/error/error";
import * as actions from '../../../store/actions/index'
// name: "",
// email: "",
// address: {
//   street: "",
//   postalCode: ""
// }
class ContactData extends Component {
  state = {
    form: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Zip Code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fasteset", display: "Fastest" },
            { value: "cheapest", display: "Cheapest" }
          ]
        },
        validation: {},
        value: "fastest",
        valid: true
      }
    },
    formIsValid: false,
  };

  order = event => {
    event.preventDefault();
    let formData = {};
    for (let formElementIdentifier in this.state.form) {
      formData[formElementIdentifier] = this.state.form[formElementIdentifier];
    }
    console.log(formData, "form data!!!");

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData
    };
    this.props.onOrderBurger(order)
  };

  isValid = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  inputChange = (event, inputIdentifier) => {
    console.log(event.target.value, inputIdentifier);
    const updatedForm = { ...this.state.form };
    const updatedFormElement = { ...updatedForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.isValid(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedForm[inputIdentifier] = updatedFormElement;
    console.log(updatedFormElement);

    let formIsValid = true;
    for (let inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ form: updatedForm, formIsValid: formIsValid });
  };

  render() {
    const formArray = [];
    for (let key in this.state.form) {
      formArray.push({ id: key, config: this.state.form[key] });
    }
    let form = (
      <form onSubmit={this.order}>
        {formArray.map(element => (
          <Input
            touched={element.config.touched}
            invalid={!element.config.valid}
            key={element.id}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            change={event => this.inputChange(event, element.id)}
            shouldValidate={element.config.validation}
          />
        ))}

        <Button btnType="Success" disable={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className="ContactData">
        <h4> Enter Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData) => {dispatch(actions.purchaseBurger(orderData))}
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));
