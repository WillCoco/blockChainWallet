import React from 'react';
import {StyleSheet, Image} from 'react-native';
// import {Icon} from 'react-native-elements';
import {TinyText} from 'react-native-normalization-text';
import {BottomTabBar} from 'react-navigation-tabs';
import _get from 'lodash/get';
import {connect} from 'react-redux';
import i18n from '../../helpers/i18n';
import images from '../../images';

const TabBarComponent = props => {
  const {index: tabIndex} = props.navigation.state;
  const {activeTintColor, inactiveTintColor} = props;

  return (
    <BottomTabBar
      {...props}
      getLabelText={route =>
        getLabelText(route.route, tabIndex, activeTintColor, inactiveTintColor)
      }
      renderIcon={route =>
        renderIcon(route.route, tabIndex, activeTintColor, inactiveTintColor)
      }
      style={{}}
    />
  );
};

const tabs = {
  Home: {
    index: 0,
    // icon: 'ASSET',
    icon: 'home-currency-usd',
    iconType: 'material-community',
    textKey: 'asset',
    img: images.tabAsset,
    imgActive: images.tabAssetActive,
  },
  Exchange: {
    index: 1,
    icon: 'user',
    iconType: 'font-awesome',
    textKey: 'quickExchange',
    img: images.tabExchange,
    imgActive: images.tabExchangeActive,
  },
  Me: {
    index: 2,
    icon: 'user',
    iconType: 'font-awesome',
    textKey: 'me',
    img: images.tabMe,
    imgActive: images.tabMeActive,
  },
};

function getLabelText(route, tabIndex, activeTintColor, inactiveTintColor) {
  const {index, textKey} = tabs[route.key];
  const isChecked = tabIndex === index;
  const color = isChecked ? activeTintColor : inactiveTintColor;
  return <TinyText style={[styles.label, {color}]}>{i18n.t(textKey)}</TinyText>;
}

function renderIcon(route, tabIndex, activeTintColor, inactiveTintColor) {
  const {index, icon, iconType} = tabs[route.key];
  const isChecked = tabIndex === index;
  const color = isChecked ? activeTintColor : inactiveTintColor;

  // return <Text style={[style.icon, {color}]}>{icon}</Text>;
  return (
    <Image
      resizeMode="contain"
      source={tabImgPicker(index, isChecked)}
      style={styles.icon}
    />
  );
  // return <Icon name={icon} type={iconType} style={styles.icon} color={color} />;
}

function tabImgPicker(index, isChecked) {
  if (index === 0) {
    return isChecked ? tabs.Home.imgActive : tabs.Home.img;
  }

  if (index === 1) {
    return isChecked ? tabs.Exchange.imgActive : tabs.Exchange.img;
  }

  if (index === 2) {
    return isChecked ? tabs.Me.imgActive : tabs.Me.img;
  }
}

function mapStateToProps(state) {
  return {
    language: _get(state.appSetting, ['language']),
  };
}

const styles = StyleSheet.create({
  icon: {
    height: 20,
  },
  label: {
    textAlign: 'center',
  },
});

export default connect(
  mapStateToProps,
  null,
)(TabBarComponent);
