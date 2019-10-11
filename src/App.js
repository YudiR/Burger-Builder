import React from 'react';
import {Route, Switch} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Layout from './hoc/layout/layout'
import BurgerBuilder from './containers/burgerBuilder/burgerBuilder'
import Checkout from './containers/checkout/checkout'
import Orders from './containers/orders/orders'


function App() {
  return (
    <div>
      <Layout>
        <Switch>
        <Route path='/checkout'  component = {Checkout}/>
        <Route path ='/orders' component = {Orders}/>
        <Route path='/' exact component = {BurgerBuilder}/>
        </Switch>
        
      </Layout>
    
    </div>
  );
}

export default App;
