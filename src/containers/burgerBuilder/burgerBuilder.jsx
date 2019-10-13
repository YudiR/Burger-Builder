import React, { Component } from "react";
import { connect } from 'react-redux';

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/burger";
import Controls from "../../components/Burger/controls/controls";
import Modal from "../../components/ui/modal/modal";
import OrderSummary from "../../components/Burger/orderSummary/orderSummary";
import axios from "../../axios/axios";
import Spinner from "../../components/ui/spinner/spinner";
import error from "../../hoc/error/error";
import * as actionTypes from '../../store/actions'
// '../..components/Burger/controls/controls'


class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasable: false,
      purchasing: false,
      loading: false,
      error: false
    };
  }

  componentDidMount() {
    // axios
    // .get("/ingredients.json")
    // .then(response => {
    //   this.setState({ ingredients: response.data });
    // })
    // .catch(error => {
      // this.setState({ error: true });
    // });
    console.log(this.props.ings, 'nininigs')
    console.log(this.props.price, 'price')

    // this.setState({ error: true });
  }

  updatePurchase(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }


  purchase = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancel = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinue = () => {
    const queryParams = [];
    for (let i in this.props.ings) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.props.ings[i])
      );
    }
    queryParams.push("price=" + this.props.price);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };
  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = this.state.error ? (
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
            ordered={this.purchase}
            ingredientAdded={ this.props.onIngredientAdded}
            ingredientRemoved={ this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.state.purchasable}
          />
        </Aux>
      );

      if (this.state.loading) {
        orderSummary = <Spinner />;
      }

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
    ings: state.ingredients,
    price: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ing) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName:ing}),
    onIngredientRemoved: (ing) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName:ing})

  };
};

export default connect(mapStateToProps,mapDispatchToProps)(error(BurgerBuilder, axios));
