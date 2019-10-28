import React from "react";
import { BurgerBuilder } from "./burgerBuilder";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Controls from '../../components/Burger/controls/controls'
import item from "../../components/navigation/item/item";
configure({ adapter: new Adapter() });

describe("<BurgerBuilder", () => {
    let wrapper 
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={()=> {}} />)
    })

    it("should render controls when there are ingredients", () => {

        wrapper.setProps({ings: {salad: 0}, price:88})
        expect(wrapper.find(Controls)).toHaveLength(1)
    })
})