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
import {PrimaryText} from 'react-native-normalization-text';
import i18n from '../../helpers/i18n';
import _get from 'lodash/get';
import colors from '../../helpers/colors';
import safePage from '../../helpers/safePage';
import NavBar from '../../components/NavBar';
import Exchanger from './Exchanger';
import ExchangeHistories from './ExchangeHistories';
import ExchangeContract from './ExchangeWithdraw';
import PageWrapper from '../../components/PageWrapper';
import DotsNet from '../../components/PageWrapper/PageBackgrounds/DotsNet';

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
    <PageWrapper style={styles.wrapper} pageBackgroundImg={<DotsNet />}>
      <NavBar
        isAbsolute
        leftElement={null}
        title={i18n.t('quickExchange')}
        absoluteViewStyle={{
          backgroundColor: 'transparent',
          paddingTop: 0,
        }}
      />
      <Exchanger />
      <ExchangeContract />
      <ExchangeHistories />
      <PrimaryText style={styles.noticeText}>{i18n.t('exchangeEndText')}</PrimaryText>
    </PageWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.theme,
  },
  noticeText: {
    position: 'absolute',
    backgroundColor: colors.notice,
    top: 36,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#fff',
  },
});

const safeExchange = props => safePage(Exchange, props);

export default safeExchange;
