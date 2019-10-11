import React, { Component } from "react";
import Summary from "../../components/order/checkoutSummary/checkoutSummary";
import CheckoutSummary from "../../components/order/checkoutSummary/checkoutSummary";
import ContactData from './ContactData/contactData'
import {Route} from 'react-router-dom'
class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };

componentWillMount () {
  const query = new URLSearchParams(this.props.location.search)
  console.log(query.entries(),'[checkout]')
  const ingredients = {}
  let price = 0
  for (let param of query.entries()){
    if (param[0] === 'price'){
price = param[1]
    }
    else {
          ingredients[param[0]] = + param[1]

    }
  }
  console.log(ingredients)
  this.setState({ingredients: ingredients, totalPrice: price})
}

  continue = () => {
    this.props.history.replace('/checkout/contact-data')
  };

  cancel = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          continue={this.continue}
          cancel={this.cancel}
          ingredients={ this.state.ingredients }
        />
        <Route path={this.props.match.path + '/contact-data'} render={(props)=> (<ContactData {...this.props} price =  {this.state.totalPrice} ingredients = {this.state.ingredients}/>)}  />
      </div>
    );
  }
}

export default Checkout
