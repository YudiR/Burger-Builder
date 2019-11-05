import reducer from "./burgerBuilder";
import * as actionTypes from "../actions/actionTypes";

describe("BurgerBuilder Reducer", () => {
  it("should return added salad when  and total price when a salad added", () => {
    expect(
      reducer(
        {
          ingredients: { salad: 0, bacon: 0, cheese: 0, meat: 0 },
          error: false,
          totalPrice: 4,
          building: false
        },
        {
          type: actionTypes.ADD_INGREDIENT,
          ingredientName: "salad"
        }
      )
    ).toEqual({
      ingredients: { salad: 1, bacon: 0, cheese: 0, meat: 0 },
      error: false,
      totalPrice: 4.5,
      building: true
    });
  });
});
