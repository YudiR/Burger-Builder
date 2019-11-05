import React, { Component } from "react";
import Button from "../../../components/ui/button/button";
import css from "./contactData.css";
import axios from "../../../axios/axios";
import Spinner from "../../../components/ui/spinner/spinner";
import Input from "../../../components/ui/input/input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/error/error";
import * as actions from "../../../store/actions/index";
import { updatedObject, isValid } from "../../../shared/utility/utility";

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
    formIsValid: false
  };

  order = event => {
    event.preventDefault();
    let formData = {};
    for (let formElementIdentifier in this.state.form) {
      formData[formElementIdentifier] = this.state.form[formElementIdentifier];
      console.log()
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    };
    this.props.onOrderBurger(order, this.props.token);
  };

  

  inputChange = (event, inputIdentifier) => {

    const updatedFormElement = updatedObject(this.state.form[inputIdentifier], {
      value: event.target.value,
      valid:  isValid(
        event.target.value,
        this.state.form[inputIdentifier].validation
      ),
      touched: true
    });
    const updateForm = updatedObject(this.state.form, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updateForm) {
      formIsValid = updateForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ form: updateForm, formIsValid: formIsValid });
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
            key={element.id}
            touched={element.config.touched}
            invalid={!element.config.valid}
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
    loading: state.order.loading,
    token: state.auth.idToken,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => {
      dispatch(actions.purchaseBurger(orderData, token));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
