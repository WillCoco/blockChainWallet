/**
 * @author: Xu Ke
 * @date: 2020/3/12 5:54 PM
 * @Description:
 *  UTC专属的资产详情交易，参杂许多utc特定业务逻辑
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import _findIndex from 'lodash/findIndex';
import _get from 'lodash/get';
import {Button} from 'react-native-elements';
import {H2, H4} from 'react-native-normalization-text';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import colors from '../../helpers/colors';
import {metrics, vw, vh} from '../../helpers/metric';
import i18n from '../../helpers/i18n';
import TabviewList from '../../components/TabviewList';
import PhoneShapeWrapper from '../../components/PhoneShapeWrapper';
import TxRow from '../../components/TxRow/TxRow';
import {getHistory, getAllHistory} from '../../helpers/chain33';
import safePage from '../../helpers/safePage';
import {isNotchScreen} from '../../helpers/utils/isNotchScreen';
import {coins} from '../../config';

const PAGE_SIZE = 14;
const INITIAL_PAGE_SIZE = 14;

const Histories = props => {
  const {navigate} = useNavigation();
  const assetsList = useSelector(state =>
    _get(state, ['assets', 'assetsList']),
  );

  const coin = useNavigationParam('token') || {};

  const tokenSymbol = coin.symbol;

  const findTokenBySymbol = symbol => {
    const tokenIndex = _findIndex(assetsList, o => symbol === o.symbol);
    return assetsList[tokenIndex];
  };

  // 当前币种
  const currentToken = findTokenBySymbol(tokenSymbol) || {};

  // 当前钱包
  const currentWallet = useSelector(
    state => _get(state.wallets, ['currentWallet']) || [],
  );

  // 是否token
  const isToken = coin.isToken;

  // token地址
  const coinAddress = isToken
    ? _get(currentWallet, ['coins', currentToken.attachSymbol, 'address'])
    : _get(currentWallet, ['coins', currentToken.symbol, 'address']);
  /**
   * 渲染行
   */
  const renderItem = ({item}, option) => {
    const opt = option || {};

    return (
      <TxRow
        {...item}
        leftMainText={opt.leftMainText}
        onPress={() =>
          navigate({
            routeName: 'DealDetails',
            params: {
              txInfo: {
                ...item,
                sign: item.direction === 'out' ? '-' : '+',
              },
              asset: coin,
            },
          })
        }
      />
    );
  };

  /**
   * 下拉刷新
   */
  const onRefresh = params => {
    return getHistory({
      symbol: currentToken.symbol,
      // address: coinAddress,
      start: 0,
      size: PAGE_SIZE,
      executor: isToken ? 'token' : 'coins',
      ...params,
    });
  };

  /**
   * 加载更多
   */
  const onEndReached = (page, size, params) => {
    return getHistory({
      symbol: currentToken.symbol,
      // address: coinAddress,
      start: page.current * size,
      executor: isToken ? 'token' : 'coins',
      size,
      ...params,
    });
  };

  /**
   * 全部记录
   */
  const allOnRefresh = () => {
    return getAllHistory({
      addr: coinAddress,
      symbol: isToken ? currentToken.symbol : coins.UTC.symbol,
      start: 0,
      size: PAGE_SIZE,
    });
  };
  const allOnEndReached = (page, size) => {
    return getAllHistory({
      addr: coinAddress,
      symbol: isToken ? currentToken.symbol : coins.UTC.symbol,
      start: page.current * size,
      size,
    });
  };
  const allHistories = {
    key: 'allHistories',
    getTitle: () => i18n.t('allHistories'),
    size: PAGE_SIZE,
    initialNumToRender: INITIAL_PAGE_SIZE,
    renderItem: renderItem,
    onRefresh: allOnRefresh,
    onEndReached: allOnEndReached,
  };

  /**
   * 转入记录
   */
  const inHistories = {
    key: '2',
    getTitle: () => i18n.t('inHistories'),
    size: PAGE_SIZE,
    initialNumToRender: INITIAL_PAGE_SIZE,
    renderItem: renderItem,
    onRefresh: () =>
      onRefresh({
        receiver: coinAddress,
        action: 'transfer',
      }),
    onEndReached: (page, size) =>
      onEndReached(page, size, {
        receiver: coinAddress,
      }),
  };

  /**
   * 转出记录
   */
  const outHistories = {
    key: '3',
    getTitle: () => i18n.t('outHistories'),
    size: PAGE_SIZE,
    initialNumToRender: INITIAL_PAGE_SIZE,
    renderItem: renderItem,
    onRefresh: () =>
      onRefresh({
        sender: coinAddress,
        action: 'transfer',
      }),
    onEndReached: (page, size) =>
      onEndReached(page, size, {
        sender: coinAddress,
      }),
  };

  /**
   * token页兑换记录
   */
  // 是查单个token兑换 还是查所有token兑换
  // const exchangeExecutor = isToken ? '' : 'exchange';
  // const exchangeSymbol = isToken ? currentToken.symbol : '';
  const exchangeHistories = {
    key: '4',
    getTitle: () => i18n.t('exchangeHistories'),
    size: PAGE_SIZE,
    initialNumToRender: INITIAL_PAGE_SIZE,
    renderItem: item => {
      return renderItem(item, {
        leftMainText: i18n.t('exchangeUTC'),
      });
    },
    onRefresh: () =>
      onRefresh({
        sender: coinAddress,
        executor: 'exchange',
        action: 'ExchangeOp',
        symbol: currentToken.symbol,
      }),
    onEndReached: (page, size) =>
      onEndReached(page, size, {
        sender: coinAddress,
        executor: 'exchange',
        action: 'ExchangeOp',
        symbol: currentToken.symbol,
      }),
  };
  /**
   * 主币页记录
   */
  const withdrawHistories = {
    key: 'withdrawHistories',
    getTitle: () => i18n.t('withdraw'),
    size: PAGE_SIZE,
    initialNumToRender: INITIAL_PAGE_SIZE,
    renderItem: item => {
      return renderItem(item, {
        leftMainText: i18n.t('withdraw'),
      });
    },
    onRefresh: () =>
      onRefresh({
        sender: coinAddress,
        // executor: 'withdraw',
        action: 'withdraw',
        symbol: coins.UTC.symbol,
      }),
    onEndReached: (page, size) =>
      onEndReached(page, size, {
        sender: coinAddress,
        // executor: 'withdraw',
        action: 'withdraw',
        symbol: coins.UTC.symbol,
      }),
  };

  /**
   * 释放记录
   */
  const unlockHistories = {
    key: '5',
    getTitle: () => i18n.t('unlockHistories'),
    size: PAGE_SIZE,
    initialNumToRender: INITIAL_PAGE_SIZE,
    renderItem: item => {
      return renderItem(item, {
        leftMainText: i18n.t('unlocked'),
      });
    },
    onRefresh: () =>
      onRefresh({
        sender: coinAddress,
        executor: 'exchange',
        action: 'ExchangeActiveOp',
        symbol: '',
      }),
    onEndReached: (page, size) =>
      onEndReached(page, size, {
        sender: coinAddress,
        executor: 'exchange',
        action: 'ExchangeActiveOp',
        symbol: 'TC',
      }),
  };

  /**
   * tabs数据
   * utc显示兑换和解锁
   * tc显示解锁
   * 其他代币只显示转账
   * todo: utc显示的兑换锁仓应该是所有代币的，不能和tc的一套数据
   */
  let tabs;

  if (currentToken.symbol === 'UTC') {
    tabs = [allHistories, inHistories, outHistories, withdrawHistories, unlockHistories];
  } else if (currentToken.symbol === 'TC') {
    tabs = [allHistories, inHistories, outHistories, exchangeHistories];
  } else {
    tabs = [allHistories, inHistories, outHistories];
  }

  return (
    <PhoneShapeWrapper>
      <H4 style={styles.transactionTitle}>{i18n.t('txHistories')}</H4>
      <TabviewList tabs={tabs} />
      <View style={styles.buttonsWrapper}>
        <Button
          title={i18n.t('transfer')}
          containerStyle={styles.btnContainerStyle}
          buttonStyle={StyleSheet.flatten([
            styles.btnStyle,
            styles.leftBtnStyle,
          ])}
          // icon={<Icon name="exit-to-app" color={colors.textWhite} />}
          onPress={() => navigate({routeName: 'Transfer', params: {token: currentToken}})}
        />
        <Button
          title={i18n.t('collect')}
          containerStyle={styles.btnContainerStyle}
          buttonStyle={StyleSheet.flatten([
            styles.btnStyle,
            styles.middleBtnStyle,
          ])}
          // icon={<Icon name="swap-horiz" color={colors.textWhite} />}
          onPress={() =>
            navigate({routeName: 'Collect', params: {currentToken}})
          }
        />
        <Button
          title={i18n.t('exchange')}
          containerStyle={styles.btnContainerStyle}
          buttonStyle={StyleSheet.flatten([
            styles.btnStyle,
            styles.rightBtnStyle,
          ])}
          // icon={<Icon name="swap-horiz" color={colors.textWhite} />}
          onPress={() => navigate({routeName: 'Exchange'})}
        />
      </View>
    </PhoneShapeWrapper>
  );
};

const safeHistories = props => safePage(Histories, props);

safeHistories.defaultProps = {
  asset: null,
  token: {amount: 1},
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: metrics.spaceS,
    borderTopLeftRadius: metrics.spaceN,
    borderTopRightRadius: metrics.spaceN,
    overflow: 'hidden',
  },
  buttonsWrapper: {
    flexDirection: 'row',
    paddingVertical: metrics.spaceS / 2,
    paddingHorizontal: metrics.spaceS / 2,
  },
  btnContainerStyle: {
    flex: 1,
    alignSelf: 'center',
    borderRadius: 0,
    paddingHorizontal: metrics.spaceS / 2,
  },
  btnStyle: {
    borderRadius: vw(0.5),
    paddingVertical: metrics.spaceS,
    marginBottom: isNotchScreen() ? vh(2.5) : metrics.spaceS,
  },
  leftBtnStyle: {
    backgroundColor: colors.success,
  },
  middleBtnStyle: {
    backgroundColor: colors.theme,
  },
  rightBtnStyle: {
    backgroundColor: colors.textWarn,
  },
  historyWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: metrics.spaceS,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: vw(4),
    paddingVertical: vw(2),
  },
  left: {
    flexDirection: 'row',
  },
  transactionTitle: {
    paddingLeft: metrics.spaceS,
    // paddingVertical: vw(1),
    // borderBottomWidth: StyleSheet.hairlineWidth * 2,
    // borderColor: colors.divider,
  },
});

export default safeHistories;
