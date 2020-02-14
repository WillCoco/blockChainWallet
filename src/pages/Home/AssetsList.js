import React from 'react';
import _get from 'lodash/get';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Divider} from 'react-native-elements';
import {PrimaryText, SmallText, TinyText, H4, scale} from 'react-native-normalization-text';
import {useNavigation} from 'react-navigation-hooks';
import BigNumber from 'bignumber.js';
import Empty from '../../components/Empty';
import {vw, metrics} from '../../helpers/metric';
import colors from '../../helpers/colors';
import i18n from '../../helpers/i18n';
import safePage from '../../helpers/safePage';
import {upperUnit} from '../../helpers/utils/numbers';

const AssetsList = props => {
  const {navigate} = useNavigation();

  /**
   * 前往详情
   */
  const goAssetDetail = symbol => {
    navigate({routeName: 'AssetDetail', params: {tokenSymbol: symbol}});
  };

  /**
   * 是否显示资产
   */
  const isShowAssets = useSelector(state =>
    _get(state, ['appSetting', 'isShowAssets']),
  );

  /**
   * 资产列表
   */
  const assetsList = useSelector(
    state => _get(state, ['assets', 'assetsList']) || [],
  );

  /**
   * 汇率
   */
  const rates = useSelector(
    state => _get(state, ['assets', 'exchangeRate']) || {},
  );

  const getValue = React.useCallback(
    asset => {
      const {symbol, balanceFmt} = asset || {};
      if (!symbol) {
        console.warn('not fount symbol:', symbol);
        return 0;
      }
      const rate = _get(rates, symbol) || 0;
      const v = upperUnit(rate * +asset.balance, {
        pretty: false,
      });

      // const v = (rate * +('99741.995001'))/*.toFixed(2)*/;
      return new BigNumber(v).toFormat(2);
    },
    [rates],
  );

  return (
    <View style={{minHeight: '80%', flex: 1}}>
      {props.isLoaded && assetsList.length === 0 ? (
        <Empty />
      ) : (
        <>
          {/*<H4 color="secondary">{i18n.t('allAssets')}</H4>*/}
          {assetsList.map((asset, index) => {
            return (
              <View style={styles.wrapper} key={`asset_${index}`}>
                <TouchableOpacity
                  style={StyleSheet.flatten([styles.assetRow])}
                  onPress={() => goAssetDetail(asset.symbol)}>
                  <View style={styles.leftContent}>
                    <View style={styles.assetIcon}>
                      <Image
                        resizeMode="contain"
                        style={styles.iconStyle}
                        source={asset.icon}
                      />
                    </View>

                    <View style={styles.leftWrapper}>
                      <PrimaryText color="title" style={{fontWeight: '500'}}>
                        {asset.symbol}
                      </PrimaryText>
                      <TinyText color="" style={styles.tinyText}>
                        {i18n.t('frozenAsset')} xxx{}
                      </TinyText>
                      <TinyText color="" style={styles.tinyText}>
                        {i18n.t('availableAsset')} xxx{}
                      </TinyText>
                    </View>
                  </View>
                  <View>
                    <PrimaryText color="title" style={styles.title}>
                      {isShowAssets ? asset.balanceFmt : '****'}
                    </PrimaryText>
                    <SmallText color="" style={styles.value}>
                      {isShowAssets ? `¥${getValue(asset)}` : '****'}
                    </SmallText>
                  </View>
                </TouchableOpacity>
                <Divider style={{backgroundColor: colors.dividerDark}} />
              </View>
            );
          })}
        </>
      )}
    </View>
  );
};

AssetsList.defaultProps = {
  assetsList: [],
  isLoaded: false,
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: vw(4),
  },
  assetRow: {
    height: vw(18),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: metrics.spaceS,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assetIcon: {
    width: vw(10),
    height: vw(10),
    borderRadius: vw(6),
    borderWidth: 1,
    borderColor: colors.dividerDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: metrics.spaceS,
  },
  iconStyle: {
    width: vw(7),
    height: vw(7),
    alignSelf: 'center',
  },
  leftWrapper: {
    justifyContent: 'center',
  },
  title: {
    fontSize: scale(14),
    textAlign: 'right',
    fontWeight: '500',
  },
  tinyText: {
    color: colors.textSecondary,
    lineHeight: scale(12),
  },
  value: {
    textAlign: 'right',
  },
});

export default props => safePage(AssetsList, props);
