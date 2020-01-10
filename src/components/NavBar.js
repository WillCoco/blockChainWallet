import React from 'react';
import NavBar from 'react-native-pure-navigation-bar';
import colors from '../helpers/colors';

// 导航栏默认样式
const defaultStyle = {
  safeView: {
    backgroundColor: colors.theme,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.textWhite,
    fontWeight: '600',
  },
  gobackImage: {
    width: 10,
  },
  buttonView: {
    color: colors.textWhite,
  },
  gobackView: {
    color: colors.textWhite,
  },
};

const Navbar = props => {
  const navStyle = {
    ...defaultStyle,
    safeView: {...defaultStyle.safeView, ...props.safeView},
  };
  return (
    <NavBar
      title={props.title}
      headerTitle={props.headerTitle}
      hasSeperatorLine={false}
      onLeft={props.onLeft}
      leftElement={props.leftElement}
      onRight={props.onRight}
      rightElement={props.rightElement}
      style={navStyle}
      gobackImage={require('../images/backBtn.png')}
    />
  );
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
  safeView: void 0,
};

export default Navbar;
