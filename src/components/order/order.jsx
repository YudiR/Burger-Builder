import React from 'react'
import css from './order.css'
const order = (props) => {
    const ingredients = []

    for ( let IngredientName in props.ingredients) {
        ingredients.push(
            {
                name: IngredientName,
                amount: props.ingredients[IngredientName]
            }
        )
    }

    const ingredinetOutput = ingredients.map( ig => {
        return <span style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
            }} key = {ig.name}> {ig.name} ({ig.amount}) </span>
    })

    console.log(ingredients,'ing')

    



    return (
<div className= 'Order'>
            <p>Ingredients: {ingredinetOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat( props.price ).toFixed( 2 )}</strong></p>
        
</div>
    )

    }

export default order 