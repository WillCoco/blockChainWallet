import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from 'react-native';
import {H4, H1, PrimaryText, scale} from 'react-native-normalization-text';
import {useDispatch, useSelector} from 'react-redux';
import _get from 'lodash/get';
import {Icon} from 'react-native-elements';
import {useNavigation} from 'react-navigation-hooks';
import BigNumber from 'bignumber.js';
import colors from '../../helpers/colors';
import i18n from '../../helpers/i18n';
import WalletQuickManager from './WalletQuickManager';
import {vh, vw, metrics} from '../../helpers/metric';
import {appSettingAction} from '../../redux/actions/';
import safePage from '../../helpers/safePage/';
import {Overlay} from '../../components/Mask';
import images from '../../images';
import {upperUnit} from '../../helpers/utils/numbers';
import Iconshoukuan from '../../components/Iconfont/Iconshoukuan';
import Iconliaotianzhuanzhang from '../../components/Iconfont/Iconliaotianzhuanzhang';

const Dashboard = () => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();

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
   * 计算资产总价值
   */
  const assetsValue = React.useMemo(() => {
    let total = 0;

    assetsList.forEach(asset => {
      const newValue = getRate(asset.symbol) * +asset.balance;
      total += newValue ? newValue : 0;
    });

    // console.log(total, 'total asset');
    // total = total.toFixed(2);
    const v = upperUnit(total, {pretty: false});
    return new BigNumber(v).toFormat(2);
  }, [assetsList, getRate]);

  return (
    <View>
      <ImageBackground
        source={images.dashboardBg}
        resizeMode="stretch"
        style={styles.wrapper}>
        <WalletQuickManager
          show={options =>
            Overlay.push(Overlay.contentTypes.WALLET_QUICK_MANAGER, options)
          }
        />
        <View style={styles.assetWrapper}>
          <TouchableOpacity
            style={styles.assetButton}
            onPress={() => dispatch(appSettingAction.toggleIsShowAssets())}>
            <PrimaryText style={styles.assetsTitle}>
              {i18n.t('myAssets')}({i18n.t('RMB')})
            </PrimaryText>
            <Icon
              name={isShowAssets ? 'eye' : 'eye-with-line'}
              type="entypo"
              color={colors.textWhite}
              size={Math.min(14, vw(6))}
            />
          </TouchableOpacity>
          <View>
            <H1 color="white" style={{textAlign: 'center', marginRight: 4}}>
              {isShowAssets ? assetsValue : '********'}
            </H1>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.contentWrapper}>
        <TouchableOpacity
          style={styles.contentLeft}
          onPress={() => navigate('Transfer')}>
          <Iconliaotianzhuanzhang size={scale(30)} style={{marginRight: 4}} />
          <H4 style={styles.alignCenter}>{i18n.t('transfer')}</H4>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          style={styles.contentRight}
          onPress={() => navigate('Collect')}>
          <Iconshoukuan size={scale(33)} style={{marginRight: 2}} />
          <H4 style={styles.alignCenter}>{i18n.t('collect')}</H4>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default props => safePage(Dashboard, props);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.theme,
    height: vh(29),
    minHeight: vh(29),
    paddingBottom: vh(6),
    justifyContent: 'flex-end',
  },
  assetsTitle: {
    textAlign: 'center',
    marginRight: 4,
    color: colors.textGrey1,
  },
  contentWrapper: {
    flexDirection: 'row',
    width: '88%',
    height: scale(54),
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 12,
    paddingVertical: 8,
    position: 'absolute',
    bottom: -scale(27),
    backgroundColor: '#fff',
    borderRadius: vw(1),
    ...Platform.select({
      ios: {
        shadowColor: colors.theme,
        shadowRadius: 10,
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  contentLeft: {
    flex: 1,
    paddingVertical: 4,
    // textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentRight: {
    flex: 1,
    paddingVertical: 4,
    // textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  assetWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  assetButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: vw(10),
    paddingTop: vh(1),
  },
  alignCenter: {
    textAlign: 'center',
  },
  divider: {
    width: StyleSheet.hairlineWidth * 2,
    height: '60%',
    backgroundColor: colors.dividerDark,
  },
});
