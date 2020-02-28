import React from 'react';
import {useSelector} from 'react-redux';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {ListItem} from 'react-native-elements';
import {useNavigation} from 'react-navigation-hooks';
import i18n from '../../helpers/i18n';
import _get from 'lodash/get';
import colors from '../../helpers/colors';
import {vh} from '../../helpers/metric';
import PageWrapper from '../../components/PageWrapper';

const menuList = [
  {
    title: 'walletManagement',
    icon: 'account-balance-wallet',
    route: 'WalletManagement',
    color: colors.theme,
  },
  {
    title: 'transactionHistory',
    icon: 'assignment',
    route: 'TransactionHistory',
    color: colors.theme,
  },
  {
    title: 'languages',
    icon: 'language',
    route: 'Languages',
    color: colors.theme,
  },
  // {
  //   title: 'helpCenter',
  //   icon: 'help',
  //   route: 'HelpCenter',
  //   color: colors.success,
  // },
  {
    title: 'about',
    icon: 'report',
    route: 'About',
    color: colors.success,
  },
];

const Me = () => {
  const {navigate} = useNavigation();
  useSelector(state => _get(state, ['appSetting', 'language']));

  return (
    <PageWrapper style={styles.wrapper} statusBarProps={{barStyle: 'dark-content'}}>
      <View style={styles.contentWrapper}>
        {menuList.map((item, i) => (
          <ListItem
            key={i}
            title={i18n.t(item.title)}
            leftIcon={{name: item.icon, color: item.color}}
            bottomDivider={i === 2 || i === 0 || i === 3}
            chevron
            style={(i === 2 || i === 0) && {marginTop: vh(1.5)}}
            onPress={() => navigate(item.route)}
            containerStyle={{borderColor: colors.divider}}
          />
        ))}
      </View>
    </PageWrapper>
  );
};

export default Me;
const styles = StyleSheet.create({
  wrapper: {
    // backgroundColor: colors.theme,
  },
  contentWrapper: {
    backgroundColor: colors.pageBackground,
  },
});
