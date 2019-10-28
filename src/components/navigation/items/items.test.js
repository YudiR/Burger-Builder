import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Items from "./items";
import Item from "../item/item";

configure({ adapter: new Adapter() });

describe("<Items/>", () => {
    let wrapper
    beforeEach(() =>{

    })

  it("should  render two navigation item elements when unauthenticated", () => {
    const wrapper = shallow(<Items />);
    expect(wrapper.find(Item)).toHaveLength(2);
  });

  it("should  render three navigation item elements when authenticated", () => {
    const wrapper = shallow(<Items isAuthenticated />);
    expect(wrapper.find(Item)).toHaveLength(3);
  });
});