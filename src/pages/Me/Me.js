import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import {useNavigation} from 'react-navigation-hooks';
import i18n from '../../helpers/i18n';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _get from 'lodash/get';
import {appSettingAction} from '../../redux/actions';
import colors from '../../helpers/colors';

const menuList = [
  {
    title: 'walletManagement',
    icon: 'flight-takeoff',
    route: 'WalletManagement'
  },
  {
    title: 'transactionHistory',
    icon: 'flight-takeoff',
    route: 'TransactionHistory',
  },
  {
    title: 'languages',
    icon: 'flight-takeoff',
    route: 'Languages',
  },
  {
    title: 'helpCenter',
    icon: 'help',
    route: 'HelpCenter',
  },
  {
    title: 'about',
    icon: 'flight-takeoff',
    route: 'About',
  },
];

const Me = () => {
  const {navigate} = useNavigation();

  return (
    <View style={styles.wrapper}>
      {
        menuList.map((item, i) => (
          <ListItem
            key={i}
            title={i18n.t(item.title)}
            leftIcon={{ name: item.icon }}
            bottomDivider
            chevron
            style={(i === 2 || i === 0) && {marginTop: 10}}
            onPress={() => navigate(item.route)}
          />
        ))
      }
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.pageBackground,
  }
});

function mapStateToProps(state) {
  return {
    language: _get(state.appSetting, ['language']),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateLanguage: appSettingAction.updateLanguage,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Me);