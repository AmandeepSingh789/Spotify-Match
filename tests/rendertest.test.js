import React from 'react';
import {shallow} from 'enzyme';
import HomeScreen from '../screens/HomeScreen';

describe('HomeScreen', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<HomeScreen />);
    expect(wrapper).toMatchSnapshot();
  });

  // it('should contain a Text component with the text "Welcome to the Home Screen"', () => {
  //   const wrapper = shallow(<HomeScreen />);
  //   expect(wrapper.find('Text').at(0).props().children).toEqual('Welcome to the Home Screen');
  // });

  // You can add more test cases here to test other functionality of the HomeScreen component
});
