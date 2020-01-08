import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {ListItem} from 'react-native-elements';
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
    icon: 'account-balance-wallet',
    route: 'WalletManagement',
    color: colors.theme,
  },
  // todo: 全部交易（主币和token的暂无接口）
  // {
  //   title: 'transactionHistory',
  //   icon: 'assignment',
  //   route: 'TransactionHistory',
  //   color: colors.theme,
  // },
  {
    title: 'languages',
    icon: 'language',
    route: 'Languages',
    color: colors.theme,
  },
  {
    title: 'helpCenter',
    icon: 'help',
    route: 'HelpCenter',
    color: colors.success,
  },
  {
    title: 'about',
    icon: 'report',
    route: 'About',
    color: colors.success,
  },
];

const Me = () => {
  const {navigate} = useNavigation();

  return (
    <View style={styles.wrapper}>
      {menuList.map((item, i) => (
        <ListItem
          key={i}
          title={i18n.t(item.title)}
          leftIcon={{name: item.icon, color: item.color}}
          bottomDivider={i === 2 || i === 0 || i === 3}
          chevron
          style={(i === 2 || i === 0) && {marginTop: 10}}
          onPress={() => navigate(item.route)}
          containerStyle={{borderColor: colors.divider}}
        />
      ))}
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