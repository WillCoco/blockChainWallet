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
import {StyleSheet} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import i18n from '../../helpers/i18n';
import _get from 'lodash/get';
import safePage from '../../helpers/safePage';
import TabviewList from '../../components/TabviewList';
import {getExchangeHistory} from '../../helpers/chain33';
import TxRow from '../../components/TxRow/TxRow';
import PhoneShapeWrapper from '../../components/PhoneShapeWrapper';
import {getHistory} from '../../helpers/chain33';

const PAGE_SIZE = 12;
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
   * 兑换下拉刷新
   */
  const onRefresh = () => {
    // return Promise.resolve([]);
    return getExchangeHistory({
      address: currentWallet.address,
      executor: 'token',
    });
  };

  /**
   * 兑换加载更多
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
   * 释放下拉刷新。只显示需要缓释的
   */
  const unlockOnRefresh = params => {
    return getHistory({
      addr: currentWallet.address,
      action: 'ExchangeActiveOp',
      // symbol: currentToken.symbol,
      // address: currentWallet.address,
      start: 0,
      size: PAGE_SIZE,
      executor: 'exchange',
      ...params,
    });
  };

  /**
   * 释放加载更多
   */
  const unlockOnEndReached = (page, size) => {
    return getExchangeHistory({
      addr: currentWallet.address,
      action: 'ExchangeActiveOp',
      start: page.current * size,
      executor: 'exchange',
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
    onRefresh: unlockOnRefresh,
    onEndReached: unlockOnEndReached,
  };

  /**
   * tabs数据
   */
  const tabs = [exchangeHistories, unlockHistories];

  return (
    <PhoneShapeWrapper>
      <TabviewList style={{marginTop: -14}} tabs={tabs} tabBarWidth="50%" />
    </PhoneShapeWrapper>
  );
};

const styles = StyleSheet.create({});

const safeExchange = props => safePage(Exchange, props);

export default safeExchange;
