import React from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './hoc/layout/layout'
import BurgerBuilder from './containers/burgerBuilder/burgerBuilder'


function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder/>
      </Layout>
    
    </div>
  );
}

export default App;
