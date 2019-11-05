import React, { Component } from "react";
import css from "./auth.css";
import { connect } from "react-redux";
import Input from "../../components/ui/input/input";
import Button from "../../components/ui/button/button";
import Spinner from "../../components/ui/spinner/spinner";
import * as actions from "../../store/actions/index";
import { Redirect } from "react-router-dom";
import { updatedObject, isValid } from "../../shared/utility/utility";



export class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email Address"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

  

  inputChange = (event, controlName) => {
    const updatedControls = updatedObject(this.state.controls, {
      [controlName]: updatedObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: isValid(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      })
    });
    this.setState({ controls: updatedControls });
  };



  submit = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  SwitchAuthHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    const formArray = [];
    for (let key in this.state.controls) {
      formArray.push({ id: key, config: this.state.controls[key] });
    }

    let form = formArray.map(element => (
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
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }
    return (
      <div className="Auth">
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submit}>
          {form}
          <Button btnType="Success">Submit!</Button>
        </form>
        <br />
        <Button btnType="Danger" clicked={this.SwitchAuthHandler}>
          Switch to {this.state.isSignup ? "SIGN IN" : "SIGN UP"}{" "}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.idToken !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => {
      dispatch(actions.auth(email, password, isSignup));
    },
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
