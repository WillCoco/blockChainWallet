import React from 'react';
import NavBar from 'react-native-pure-navigation-bar';
import colors from '../helpers/colors';
import images from '../images';

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
  normalView: {
  },
};

const Navbar = props => {
  const navStyle = {
    ...defaultStyle,
    title: {...defaultStyle.title, ...props.titleStyle},
    safeView: {...defaultStyle.safeView, ...props.safeViewStyle},
    absoluteView: {...defaultStyle.absoluteView, ...props.absoluteViewStyle},
  };

  console.log(navStyle, 'navStyle');
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
      gobackImage={props.lightTheme ? images.backBtnLight : images.backBtn}
      isAbsolute={props.isAbsolute}
      isTranslucent={props.isTranslucent}
    />
  );
};

NavBar.defaultProps = {
  lightTheme: false, // 纯白
  title: '默认标题',
  headerShown: false,
  headerTitle: '',
  headerRight: void 0,
  headerLeft: void 0,
  onLeft: void 0,
  leftElement: void 0,
  onRight: void 0,
  rightElement: void 0,
  safeView: void 0,
  // isTranslucent: true,
};

export default Navbar;
