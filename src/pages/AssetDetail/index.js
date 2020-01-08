import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import _findIndex from 'lodash/findIndex';
import _get from 'lodash/get';
import {Button, Icon} from 'react-native-elements';
import {H1, H2, H3, H4, PrimaryText} from 'react-native-normalization-text';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import colors from '../../helpers/colors';
import {metrics, vw} from '../../helpers/metric';
import i18n from '../../helpers/i18n';
import PagingList from '../../components/PagingList';
import TxRow from '../../components/TxRow';
import {getHistory} from '../../helpers/chain33';
import {chainInfo} from '../../config';

const AssetDetail = props => {
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
    return <TxRow {...item} />;
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

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerWrapper}>
        <H2 color="">
          {currentToken.balanceFmt} {currentToken.symbol}
        </H2>
        {/*<PrimaryText>¥ {currentToken.balanceFmt}</PrimaryText>*/}
      </View>
      <View style={styles.historyWrapper}>
        <H4 style={styles.transactionTitle}>{i18n.t('transaction')}</H4>
        <PagingList
          size={14}
          //item显示的布局
          renderItem={renderItem}
          //下拉刷新相关
          onRefresh={onRefresh}
          //加载更多
          onEndReached={onEndReached}
          // ItemSeparatorComponent={separator}
          keyExtractor={(item, index) => 'index' + index + item}
          initialNumToRender={14}
        />
      </View>
      {/*<TxsList wrapperStyle={{marginTop: metrics.spaceS}} />*/}
      <View style={styles.buttonsWrapper}>
        <Button
          title={i18n.t('transfer')}
          containerStyle={styles.leftBtnContainerStyle}
          buttonStyle={styles.leftButtonStyle}
          icon={<Icon name="exit-to-app" color={colors.textWhite} />}
          onPress={() =>
            navigate({routeName: 'Transfer', params: {tokenSymbol}})
          }
        />
        <Button
          title={i18n.t('collect')}
          containerStyle={styles.rightBtnContainerStyle}
          buttonStyle={styles.rightButtonStyle}
          icon={<Icon name="swap-horiz" color={colors.textWhite} />}
          onPress={() =>
            navigate({routeName: 'Collect', params: {currentToken}})
          }
        />
      </View>
    </View>
  );
};

AssetDetail.defaultProps = {
  token: {amount: 1},
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.pageBackground,
  },
  headerWrapper: {
    backgroundColor: '#fff',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftBtnContainerStyle: {
    flex: 1,
    alignSelf: 'center',
    borderRadius: 0,
  },
  leftButtonStyle: {
    borderRadius: 0,
    backgroundColor: colors.success,
    height: vw(12),
  },
  rightBtnContainerStyle: {
    flex: 1,
    alignSelf: 'center',
    borderRadius: 0,
  },
  rightButtonStyle: {
    borderRadius: 0,
    height: vw(12),
    backgroundColor: colors.theme,
  },
  buttonsWrapper: {
    flexDirection: 'row',
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
    paddingVertical: vw(1),
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderColor: colors.divider,
  },
});

export default AssetDetail;
