import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios/axios";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/burger";
import Controls from "../../components/Burger/controls/controls";
import Modal from "../../components/ui/modal/modal";
import OrderSummary from "../../components/Burger/orderSummary/orderSummary";
import Spinner from "../../components/ui/spinner/spinner";
import error from "../../hoc/error/error";
import * as action from "../../store/actions/index";
// '../..components/Burger/controls/controls'

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasing: false
    };
  }

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchase(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  purchase = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push("/auth");
    }
  };

  purchaseCancel = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinue = () => {
    // const queryParams = [];
    // for (let i in this.props.ings) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.props.ings[i])
    //   );
    // }
    // queryParams.push("price=" + this.props.price);
    // const queryString = queryParams.join("&");

    this.props.history.push({
      pathname: "/checkout"
    });

    this.props.onInitPurchase();
  };
  render() {

    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = this.props.error ? (
      <h3 style={{ textAlign: "center" }}>The Ingredients Cant be Found</h3>
    ) : (
      <Spinner />
    );
    let orderSummary = null;
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <Controls
            isAuth={this.props.isAuthenticated}
            ordered={this.purchase}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={() => this.updatePurchase(this.props.ings)}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancel={this.purchaseCancel}
          purchaseContinue={this.purchaseContinue}
          price={this.props.price.toFixed(2)}
        />
      );
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancel}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.idToken !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ing => dispatch(action.addIngredient(ing)),
    onIngredientRemoved: ing => dispatch(action.removeIngredient(ing)),
    onInitIngredients: () => dispatch(action.initIngredients()),
    onInitPurchase: () => {
      dispatch(action.purchaseInIt());
    },
    onSetAuthRedirectPath: (path) => dispatch(action.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(error(BurgerBuilder, axios));
