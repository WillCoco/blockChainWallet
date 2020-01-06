import React from 'react';
import NavBar from 'react-native-pure-navigation-bar';

const Navbar = props => {
  return (
    <NavBar
      title={props.title}
      headerTitle={props.headerTitle}
      hasSeperatorLine={false}
      onLeft={props.onLeft}
      leftElement={props.leftElement}
      onRight={props.onRight}
      rightElement={props.rightElement}
      gobackImage={require('../images/backBtn.png')}
    />
  )
};

NavBar.defaultProps = {
  title: '默认标题',
  headerShown: false,
  headerTitle: '',
  headerRight: void 0,
  headerLeft: void 0,
  onLeft: void 0,
  lertElement: void 0,
  onRight: void 0,
  rightElement: void 0,
};

export default Navbar;