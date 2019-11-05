import React from "react";
import { Orders } from "./orders";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Controls from '../../components/Burger/controls/controls'
import item from "../../components/navigation/item/item";
// configure({ adapter: new Adapter() });

// describe("<Orders", () => {
//     let wrapper 
//     beforeEach(() => {
//         wrapper = shallow(<Orders props='hey'  />)
//     })

//     it("should render controls when there are ingredients", () => {

//         // wrapper.setProps({ings: {salad: 0}, price:88})
//         expect(wrapper.find(orders)).toHaveLength(1)
//     })
// })