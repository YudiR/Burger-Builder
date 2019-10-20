import React, { Component } from "react";
import Summary from "../../components/order/checkoutSummary/checkoutSummary";
import CheckoutSummary from "../../components/order/checkoutSummary/checkoutSummary";
import ContactData from "./ContactData/contactData";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
class Checkout extends Component {
  // componentWillMount () {
  //   const query = new URLSearchParams(this.props.location.search)
  //   console.log(query.entries(),'[checkout]')
  //   const ingredients = {}
  //   let price = 0
  //   for (let param of query.entries()){
  //     if (param[0] === 'price'){
  // price = param[1]
  //     }
  //     else {
  //           ingredients[param[0]] = + param[1]

  //     }
  //   }
  //   console.log(ingredients)
  //   this.setState({ingredients: ingredients, totalPrice: price})
  // }


  continue = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  cancel = () => {
    this.props.history.goBack();
  };
  
  render() {
    const purchaseRedirect = this.props.purchased ? <Redirect to ='/'/> : null
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      summary = (
        <CheckoutSummary
          continue={this.continue}
          cancel={this.cancel}
          ingredients={this.props.ings}
        />
      );
    }
    return (
      <div>
        {purchaseRedirect}
        {summary}
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased
  };
};



export default connect(mapStateToProps)(Checkout);
