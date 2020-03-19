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
import TxRow from '../../components/TxRow/BasicTxRow';
import safePage from '../../helpers/safePage';
import {shorten} from '../../helpers/utils/strings';
import {isNotchScreen} from '../../helpers/utils/isNotchScreen';
import coinsModal from '../../coins';
import IconIn from '../../components/Iconfont/Iconin';
import IconOut from '../../components/Iconfont/Iconout';

const PAGE_SIZE = 14;
const INITIAL_PAGE_SIZE = 14;

const Histories = props => {
  const {navigate} = useNavigation();
  const assetsList = useSelector(state =>
    _get(state, ['assets', 'assetsList']),
  );

  const asset = useNavigationParam('token') || {};

  const tokenSymbol = asset.symbol;

  const findTokenBySymbol = symbol => {
    const tokenIndex = _findIndex(assetsList, o => symbol === o.symbol);
    return assetsList[tokenIndex];
  };

  // 当前币种
  const currentToken = findTokenBySymbol(tokenSymbol) || {};

  // 主币种
  const mainCoin = coinsModal[currentToken.attachSymbol || currentToken.symbol];

  console.log(mainCoin, 'currentToken')

  // 当前钱包
  const currentWallet = useSelector(
    state => _get(state.wallets, ['currentWallet']) || [],
  );

  // 是否token
  const isToken = asset.isToken;

  // token地址
  const coinAddress = isToken
    ? _get(currentWallet, ['coins', currentToken.attachSymbol, 'address'])
    : _get(currentWallet, ['coins', currentToken.symbol, 'address']);

  /**
   * 渲染行
   */
  const dataAdapter = data => {
    const amount = _get(data, 'balance_change');
    const amountStr = (amount + '').replace(/[-+]/, '');
    const isOut = amount < 0;
    return {
      LTText: shorten(data.hash),
      LBText: _get(data, 'time'),
      RTText: amountStr,
      RTSign: isOut ? '-' : '+',
      RTSymbol: mainCoin.symbol,
      RTTextColor: isOut ? colors.textWarn : colors.textSuccess,
      Icon: isOut ? IconOut : IconIn,
      iconBg: isOut ? colors.iconBg2 : colors.iconBg1,
      hasDetail: true,
    };
  };

  const renderItem = ({item}, option) => {
    const opt = option || {};
    return (
      <TxRow
        data={item}
        dataAdapter={dataAdapter}
        onPress={() =>
          navigate({routeName: 'DealDetails', params: {txInfo: item}})
        }
      />
    );
  };

  /**
   * 全部记录
   */
  const allOnRefresh = () => {
    return mainCoin.getHistories({
      symbol: currentToken.symbol,
      start: 0,
      size: PAGE_SIZE,
    });
  };

  /**
   * 加载更多
   */
  const allOnEndReached = (page, size, params) => {
    return mainCoin.getHistories({
      symbol: currentToken.symbol,
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
   * tabs数据
   */
  let tabs = [allHistories];

  return (
    <PhoneShapeWrapper>
      <H4 style={styles.transactionTitle}>{i18n.t('txHistories')}</H4>
      <TabviewList tabs={tabs} tabBarWidth="25%" />
      <View style={styles.buttonsWrapper}>
        <Button
          title={i18n.t('transfer')}
          containerStyle={styles.btnContainerStyle}
          buttonStyle={StyleSheet.flatten([
            styles.btnStyle,
            styles.leftBtnStyle,
          ])}
          // icon={<Icon name="exit-to-app" color={colors.textWhite} />}
          onPress={() => navigate({routeName: 'Transfer', params: {token: asset}})}
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
