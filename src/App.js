import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Layout from "./hoc/layout/layout";
import BurgerBuilder from "./containers/burgerBuilder/burgerBuilder";
import Logout from "../src/containers/auth/logout/logout";
import * as actions from "./store/actions/index";
import asyncComponent from './hoc/asyncComponent/async'


const asyncCheckout = asyncComponent(() => {
  return import("./containers/checkout/checkout")
})

const asyncOrders = asyncComponent(() => {
  return import("./containers/orders/orders")
})

const asyncAuth = asyncComponent(() => {
  return import("./containers/auth/auth")
})

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/auth" component={asyncAuth} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
