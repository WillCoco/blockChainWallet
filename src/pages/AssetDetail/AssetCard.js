import React from 'react';
import {View, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import _get from 'lodash/get';
import {H2, H4,PrimaryText, SmallText, scale} from 'react-native-normalization-text';
import BigNumber from 'bignumber.js';
import colors from '../../helpers/colors';
import {metrics, vw, vh} from '../../helpers/metric';
import i18n from '../../helpers/i18n';
import safePage from '../../helpers/safePage';
import images from '../../images';
import {upperUnit} from '../../helpers/utils/numbers';
import {Toast} from '../../components/Toast';
import IconHelp from '../../components/Iconfont/Iconquestion';

const AssetCard = props => {
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
   * 余额、冻结、可用展示
   */
  const balanceFmt = _get(props.asset, ['balanceFmt']);

  const frozen = _get(props.asset, ['balanceFmt']);

  const available = _get(props.asset, ['balanceFmt']);

  /**
   * 计算资产总价值
   */
  const assetsValue = React.useMemo(() => {
    const value =
      getRate(_get(props.asset, ['symbol'])) * +_get(props.asset, ['balance']);

    const v = upperUnit(value, {pretty: false});
    return new BigNumber(v).toFormat(2);
  }, [props.asset, getRate]);

  return (
    <ImageBackground source={images.netBg} style={styles.headerWrapper}>
      <ImageBackground
        resizeMode="contain"
        source={images.assetDetailCard}
        imageStyle={styles.cardImg}
        style={styles.cardWrapper}>
        <View style={styles.contentWrapper}>
          <H4 style={styles.title}>{i18n.t('myAssets')}</H4>
          <H2 style={styles.asset}>{balanceFmt}</H2>
          <SmallText style={styles.CNY}>{i18n.t('asValue')}CNY {assetsValue}</SmallText>
          <View style={styles.availableWrapper}>
            <SmallText style={styles.available}>
              {i18n.t('availableAsset')}
            </SmallText>
            <PrimaryText color="white">{frozen}</PrimaryText>
          </View>
          <View style={styles.frozenWrapper}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <SmallText style={styles.frozen}>
                {i18n.t('frozenAsset')}
              </SmallText>
              <TouchableOpacity
                onPress={() => {
                  Toast.show({data: i18n.t('frozenDescription')});
                }}>
                <IconHelp
                  style={styles.help}
                />
              </TouchableOpacity>
            </View>
            <PrimaryText color="white">{available}</PrimaryText>
          </View>
        </View>
      </ImageBackground>
    </ImageBackground>
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
  headerWrapper: {
    backgroundColor: colors.theme,
    paddingTop: vh(12),
    // height: '40%',
    // justifyContent: 'flex-end',
  },
  cardWrapper: {
    // height: vw(50),
    height: vw(62),
    // marginBottom: '4%',
  },
  cardImg: {
    width: '100%',
    height: '100%',
  },
  contentWrapper: {
    flex: 1,
    // paddingTop: vw(8.5),
    // paddingBottom: vw(14),
    // paddingHorizontal: vw(7.2),
    // justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    marginLeft: metrics.spaceL,
    marginTop: metrics.spaceL,
  },
  asset: {
    color: '#fff',
    fontSize: scale(30),
    marginLeft: metrics.spaceL,
    marginTop: metrics.spaceS,
  },
  CNY: {
    color: colors.textGrey1,
    marginLeft: metrics.spaceL,
    // position: 'absolute',
    // top: vw(18),
    // left: vw(50),
  },
  availableWrapper: {
    position: 'absolute',
    bottom: metrics.spaceL,
    left: metrics.spaceL,
  },
  available: {
    color: colors.textGrey1,
  },
  frozenWrapper: {
    position: 'absolute',
    bottom: metrics.spaceL,
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
