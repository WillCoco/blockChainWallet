import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import _findIndex from 'lodash/findIndex';
import _get from 'lodash/get';
import {Button, Icon} from 'react-native-elements';
import {H2, H4} from 'react-native-normalization-text';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import colors from '../../helpers/colors';
import {metrics, vw, vh} from '../../helpers/metric';
import i18n from '../../helpers/i18n';
import PagingList from '../../components/PagingList';
import TabviewList from '../../components/TabviewList';
import TxRow from '../../components/TxRow/TxRow';
import {getHistory} from '../../helpers/chain33';
import safePage from '../../helpers/safePage';
import {isNotchScreen} from '../../helpers/utils/isNotchScreen';
import images from '../../images';
import {chainInfo} from '../../config';

const PAGE_SIZE = 14;
const INITIAL_PAGE_SIZE = 14;

const Histories = props => {
  const {navigate} = useNavigation();
  const assetsList = useSelector(state =>
    _get(state, ['assets', 'assetsList']),
  );

  const tokenSymbol = useNavigationParam('tokenSymbol');
  const findTokenBySymbol = symbol => {
    const tokenIndex = _findIndex(assetsList, o => symbol === o.symbol);
    return assetsList[tokenIndex];
  };

  // 当前币种
  const currentToken = findTokenBySymbol(tokenSymbol);

  // 当前钱包
  const currentWallet = useSelector(
    state => _get(state.wallets, ['currentWallet']) || [],
  );

  // 是否token
  const isToken = currentToken.symbol !== chainInfo.symbol;
  /**
   * 渲染行
   */
  const renderItem = ({item}) => {
    return (
      <TxRow
        {...item}
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
    return getHistory({
      symbol: currentToken.symbol,
      address: currentWallet.address,
      start: 0,
      size: 14,
      executor: isToken ? 'token' : 'coins',
    });
  };

  /**
   * 加载更多
   */
  const onEndReached = (page, size) => {
    return getHistory({
      symbol: currentToken.symbol,
      address: currentWallet.address,
      start: page.current * size,
      size,
    });
  };

  /**
   * 全部记录
   */
  const allHistories = {
    key: '1',
    getTitle: () => i18n.t('allHistories'),
    size: PAGE_SIZE,
    initialNumToRender: INITIAL_PAGE_SIZE,
    renderItem: renderItem,
    onRefresh: onRefresh,
    onEndReached: onEndReached,
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
    onRefresh: onRefresh,
    onEndReached: onEndReached,
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
    onRefresh: onRefresh,
    onEndReached: onEndReached,
  };
  /**
   * 兑换记录
   */
  const exchangeHistories = {
    key: '4',
    getTitle: () => i18n.t('exchangeHistories'),
    size: PAGE_SIZE,
    initialNumToRender: INITIAL_PAGE_SIZE,
    renderItem: renderItem,
    onRefresh: onRefresh,
    onEndReached: onEndReached,
  };
  /**
   * 释放记录
   */
  const unlockHistories = {
    key: '5',
    getTitle: () => i18n.t('unlockHistories'),
    size: PAGE_SIZE,
    initialNumToRender: INITIAL_PAGE_SIZE,
    renderItem: renderItem,
    onRefresh: onRefresh,
    onEndReached: onEndReached,
  };

  /**
   * tabs数据
   */
  const tabs =
    currentToken.symbol === 'UTC'
      ? [allHistories, inHistories, outHistories, exchangeHistories, unlockHistories]
      : [allHistories, inHistories, outHistories, exchangeHistories];

  return (
    <View style={styles.wrapper}>
      <View style={styles.shape} />
      <View style={styles.historyWrapper}>
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
            onPress={() =>
              navigate({routeName: 'Transfer', params: {tokenSymbol}})
            }
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
      </View>
    </View>
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
  shape: {
    height: 5,
    width: vw(10),
    backgroundColor: colors.disable,
    alignSelf: 'center',
    marginTop: metrics.spaceS,
    borderRadius: 2.5,
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
