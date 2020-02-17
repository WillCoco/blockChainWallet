/**
 * @author: Xu Ke
 * @date: 2020/2/13 2:40 PM
 * @Description: 闪兑换
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {useSelector} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
// import {PrimaryText} from 'react-native-normalization-text';
import i18n from '../../helpers/i18n';
import _get from 'lodash/get';
import colors from '../../helpers/colors';
import safePage from '../../helpers/safePage';
import NavBar from '../../components/NavBar';
import Exchanger from './Exchanger';
import ExchangeHistories from './ExchangeHistories';

const Exchange = () => {
  // const {navigate} = useNavigation();
  // 当前钱包
  // const currentWallet = useSelector(
  //   state => _get(state.wallets, ['currentWallet']) || [],
  // );

  /**
   * 订阅语言
   */
  useSelector(state => _get(state, ['appSetting', 'language']));

  return (
    <View style={styles.wrapper}>
      <NavBar
        isAbsolute
        leftElement={null}
        title={i18n.t('quickExchange')}
        absoluteViewStyle={{backgroundColor: 'transparent'}}
      />
      <Exchanger />
      <ExchangeHistories />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.theme,
  },
});

const safeExchange = props => safePage(Exchange, props);

export default safeExchange;
