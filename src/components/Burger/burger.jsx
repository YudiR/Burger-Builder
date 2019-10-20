import React from 'react'
import css from './burger.css'
import Ingredient from './burgerIngredients/ingredients'
const burger = (props) => {

    let transformedIngredientss = Object.keys(props.ingredients)
    .map(igKey => {
        console.log([...Array(props.ingredients[igKey])], igKey)
        
        
    })
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_,i) => {
            return <Ingredient key={igKey + i } type = {igKey}/>
        })
    })
    .reduce((arr,el) => {
        return arr.concat(el)
    },[])
    if (transformedIngredients.length === 0 ){
        transformedIngredients = 'Please start adding ingredients.'
    }
    return(
        <div className = 'Burger'>
            <Ingredient type="bread-top"/>
            {transformedIngredients}
            <Ingredient type="bread-bottom"/>


        </div>
    )
}
export default burger