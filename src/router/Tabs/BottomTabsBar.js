import React from 'react';
import {StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {TinyText} from 'react-native-normalization-text';
import {BottomTabBar} from 'react-navigation-tabs';
import _get from 'lodash/get';
import {connect} from 'react-redux';
import i18n from '../../helpers/i18n';

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
  },
  Me: {
    index: 1,
    icon: 'user',
    iconType: 'font-awesome',
    textKey: 'me',
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
  return <Icon name={icon} type={iconType} style={styles.icon} color={color} />;
}

function mapStateToProps(state) {
  return {
    language: _get(state.appSetting, ['language']),
  };
}

const styles = StyleSheet.create({
  icon: {},
  label: {
    textAlign: 'center',
  },
});

export default connect(
  mapStateToProps,
  null,
)(TabBarComponent);
