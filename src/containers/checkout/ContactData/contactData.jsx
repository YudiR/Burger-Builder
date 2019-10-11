import React, { Component } from "react";
import Button from '../../../components/ui/button/button'
import css from './contactData.css'
import axios from "../../../axios/axios"
import Spinner from '../../../components/ui/spinner/spinner'

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading:false 
  };

  order = (event) => {
      event.preventDefault()
       this.setState({loading: true})
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'yudi',
        address: {
          street: 'Test',
          zipCode: '4444',
          country: 'Canada'
        },
        email: 'test@gmail.com'
      },
      deliveryMethod : 'fastest'
    }
    axios.post('/orders.json', order)
    .then(response =>{this.setState({loading:false})
     this.props.history.push('/')
     console.log(response)})
    .catch(error => {this.setState({loading:false})
      console.log(error)})
  }

  render() {
     let form = (  <form>
              <input className= 'Input' type="text" name="name" placeholder="Your Name" />
                <input className= 'Input' type="email" name="email" placeholder="Your Mail" />
                <input className= 'Input' type="text" name="street" placeholder="Street" />
                <input className= 'Input' type="text" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.order}>ORDER</Button>
                </form>)
        if (this.state.loading){
            form = <Spinner/>
        }
      
      return(
          <div className='ContactData'>
              <h4> Enter Contact Data</h4>
            {form}
          </div>
      )
  }
}

export default ContactData;
