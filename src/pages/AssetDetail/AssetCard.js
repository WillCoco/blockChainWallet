import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import _get from 'lodash/get';
import {H2, H4,PrimaryText, SmallText, scale} from 'react-native-normalization-text';
import BigNumber from 'bignumber.js';
import colors from '../../helpers/colors';
import {metrics, vw, vh} from '../../helpers/metric';
import i18n from '../../helpers/i18n';
import safePage from '../../helpers/safePage';
// import images from '../../images';
import {upperUnit} from '../../helpers/utils/numbers';
import {Toast} from '../../components/Toast';
import AssetCardWrapper from '../../components/AssetCardWrapper';
import IconHelp from '../../components/Iconfont/Iconquestion';
import {chainInfo} from '../../config';

const AssetCard = props => {
  /**
   * 是否主币
   */
  const isMainCoin = _get(props.asset, 'symbol') === chainInfo.symbol;

  /**
   * 汇率
   */
  const rate = useSelector(
    state => _get(state, ['assets', 'exchangeRate']) || {},
  );

  const getRate = React.useCallback(
    symbol => {
      if (!symbol) {
        console.warn('not fount symbol:', symbol);
        return 0;
      }
      return _get(rate, symbol) || 0;
    },
    [rate],
  );

  /**
   * 计算token资产总价值
   */
  const getAssetsValue = React.useCallback(
    balance => {
      const value = getRate(_get(props, ['asset', 'symbol'])) * balance;
      const v = upperUnit(value, {pretty: false});
      return new BigNumber(v).toFormat(2);
    }, [props, getRate]);

  /**
   * coins余额、exhcnage全部、可用展示
   */
  let balanceFmt;
  let assetsValue;
  let bottomLeftText;
  let bottomLeftValue = _get(props, ['asset', 'balanceFmt']);
  let bottomRightText;
  let bottomRightValue = _get(props, ['asset', 'frozenFmt']);
  let toastText;

  if (isMainCoin) {
    balanceFmt = _get(props, ['asset', 'show', 'balanceTotalFmt']);
    assetsValue = getAssetsValue(
      +_get(props, ['asset', 'show', 'balanceTotal']),
    );
    bottomLeftText = i18n.t('availableAsset');
    bottomLeftValue = _get(props, ['asset', 'balanceFmt']);
    bottomRightText = i18n.t('contractAccount');
    bottomRightValue = _get(props, ['asset', 'exchange', 'balanceFmt']);
    toastText = i18n.t('contractAssetDescription');
  } else {
    balanceFmt = _get(props, ['asset', 'balanceFmt']);
    assetsValue = getAssetsValue(+_get(props, ['asset', 'balance']));
    bottomLeftText = i18n.t('availableAsset');
    bottomLeftValue = _get(props, ['asset', 'availableFmt']);
    bottomRightText = i18n.t('frozenAsset');
    bottomRightValue = _get(props, ['asset', 'frozenFmt']);
    toastText = i18n.t('frozenDescription');
  }

  return (
    <AssetCardWrapper contentWrapperStyle={{justifyContent: 'flex-start'}}>
      <H4 style={styles.title}>{i18n.t('myAssets')}</H4>
      <H2 style={styles.asset}>{balanceFmt}</H2>
      <SmallText style={styles.CNY}>
        {i18n.t('asValue')}CNY {assetsValue}
      </SmallText>
      <View style={styles.availableWrapper}>
        <SmallText style={styles.available}>{bottomLeftText}</SmallText>
        <PrimaryText color="white">{bottomLeftValue}</PrimaryText>
      </View>
      <View style={styles.frozenWrapper}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <SmallText style={styles.frozen}>{bottomRightText}</SmallText>
          <TouchableOpacity
            onPress={() => {
              Toast.show({data: toastText});
            }}>
            <IconHelp style={styles.help} />
          </TouchableOpacity>
        </View>
        <PrimaryText color="white">{bottomRightValue}</PrimaryText>
      </View>
    </AssetCardWrapper>
  );
};

const safeAssetCard = props => safePage(AssetCard, props);

safeAssetCard.defaultProps = {
  asset: null,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.theme,
  },
  title: {
    color: '#fff',
  },
  asset: {
    color: '#fff',
    fontSize: scale(30),
    marginTop: metrics.spaceS,
  },
  CNY: {
    color: colors.textGrey1,
  },
  availableWrapper: {
    position: 'absolute',
    bottom: metrics.spaceN * 2,
    left: metrics.spaceN,
  },
  available: {
    color: colors.textGrey1,
  },
  frozenWrapper: {
    position: 'absolute',
    bottom: metrics.spaceN * 2,
    left: vw(50),
  },
  frozen: {
    color: colors.textGrey1,
  },
  help: {
    color: '#fff',
    marginLeft: 6,
  },
});

export default safeAssetCard;
