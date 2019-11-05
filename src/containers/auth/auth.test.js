import React from 'react'
import {configure, shallow} from "enzyme"
import Adapter from "enzyme-adapter-react-16";
import Button from '../../components/ui/button/button'

import {Auth} from './auth'
import item from '../../components/navigation/item/item';


import {  Provider, } from "react-redux";
import {createStore, compose, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import burgerBuilderReducer from '../../store/reducers/burgerBuilder'
import authReducer from '../../store/reducers/auth'
import orderReducer from '../../store/reducers/order'

configure({ adapter: new Adapter() });


const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
})

const store = createStore(orderReducer)

describe("<auth/>", () => {
    let wrapper 
    
    
    beforeEach(() => {
        wrapper = shallow(
        <Provider store={store}><Auth  />
        </Provider>
        
        )

    })
    
    it("sign in/sign up option should read sign in when isSignUp = false" , () => {
       wrapper.setState({isSignedUp: true})
        expect(wrapper.contains(<Button>Switch to SIGN UP</Button>)).toEqual(true)
    })


})

