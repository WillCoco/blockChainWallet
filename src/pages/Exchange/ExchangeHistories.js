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
import {View, StyleSheet, SafeAreaView, ImageBackground} from 'react-native';
import {Button} from 'react-native-elements';
import {useNavigation} from 'react-navigation-hooks';
import {PrimaryText} from 'react-native-normalization-text';
import i18n from '../../helpers/i18n';
import _get from 'lodash/get';
import colors from '../../helpers/colors';
import {vh, vw, metrics} from '../../helpers/metric';
import safePage from '../../helpers/safePage';
import NavBar from '../../components/NavBar';
import images from '../../images';
import TabviewList from '../../components/TabviewList';
import {getHistory, getExchangeHistory} from '../../helpers/chain33';
import TxRow from '../../components/TxRow/TxRow';

const PAGE_SIZE = 30;
const INITIAL_PAGE_SIZE = 10;

const Exchange = () => {
  const {navigate} = useNavigation();
  useSelector(state => _get(state, ['appSetting', 'language']));

  // 当前钱包
  const currentWallet = useSelector(
    state => _get(state.wallets, ['currentWallet']) || [],
  );

  /**
   * 渲染行
   */
  const renderItem = ({item}, option) => {
    return (
      <TxRow
        {...item}
        leftMainText={option.leftMainText}
        txType={option.txType}
        onPress={() =>
          navigate({routeName: 'DealDetails', params: {txInfo: item}})
        }
      />
    );
  };

  /**
   * 下拉刷新
   */
  const onRefresh = () => {
    // return Promise.resolve([]);
    return getExchangeHistory({
      address: currentWallet.address,
      // start: 0,
      // size: 14,
      executor: 'token',
    });
  };

  /**
   * 加载更多
   */
  const onEndReached = (page, size) => {
    // todo 现不支持加载更多， 一次拉完
    return Promise.resolve([]);

    return getExchangeHistory({
      address: currentWallet.address,
      start: page.current * size,
      size,
    });
  };

  /**
   * 兑换记录
   */
  const exchangeHistories = {
    key: '1',
    getTitle: () => i18n.t('exchangeRecordHistories'),
    size: PAGE_SIZE,
    initialNumToRender: INITIAL_PAGE_SIZE,
    renderItem: item => {
      return renderItem(item, {
        txType: 'exchangeType1',
        leftMainText:
          _get(item, ['item', 'type']) === 1 ? i18n.t('notLock') : i18n.t('unlock180'),
      });
    },

    onRefresh: onRefresh,
    onEndReached: onEndReached,
  };

  /**
   * 释放记录
   */
  const unlockHistories = {
    key: '2',
    getTitle: () => i18n.t('unlockRecordHistories'),
    size: PAGE_SIZE,
    initialNumToRender: INITIAL_PAGE_SIZE,
    renderItem: item =>
      renderItem(item, {
        txType: 'unlockType1',
        leftMainText: i18n.t('unlocked'),
      }),
    onRefresh: onRefresh,
    onEndReached: onEndReached,
  };

  /**
   * tabs数据
   */
  const tabs = [exchangeHistories, unlockHistories];

  return (
    <View style={styles.historyWrapper}>
      <View style={styles.shape} />
      <TabviewList tabs={tabs} tabBarWidth="50%" />
    </View>
  );
};

const styles = StyleSheet.create({
  historyWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: metrics.spaceS,
    borderTopLeftRadius: metrics.spaceN,
    borderTopRightRadius: metrics.spaceN,
    overflow: 'hidden',
  },
  shape: {
    height: 5,
    width: vw(10),
    backgroundColor: colors.disable,
    alignSelf: 'center',
    marginTop: metrics.spaceS,
    borderRadius: 2.5,
  },
});

const safeExchange = props => safePage(Exchange, props);

export default safeExchange;
