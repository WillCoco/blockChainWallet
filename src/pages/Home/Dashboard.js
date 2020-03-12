import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import {H4, H1, PrimaryText, scale} from 'react-native-normalization-text';
import {useDispatch, useSelector} from 'react-redux';
import _get from 'lodash/get';
// import {Icon} from 'react-native-elements';
import {useNavigation} from 'react-navigation-hooks';
import BigNumber from 'bignumber.js';
import colors from '../../helpers/colors';
import i18n from '../../helpers/i18n';
import WalletQuickManager from './WalletQuickManager';
import {vh, vw, metrics} from '../../helpers/metric';
import {appSettingAction} from '../../redux/actions/';
import safePage from '../../helpers/safePage/';
import {Overlay} from '../../components/Mask';
import AssetCardWrapper from '../../components/AssetCardWrapper';
// import {upperUnit} from '../../helpers/utils/numbers';
import Iconshoukuan from '../../components/Iconfont/Iconshoukuan2';
import images from '../../images';
import Iconliaotianzhuanzhang from '../../components/Iconfont/Iconzhuanzhang';
import IconeyeOpen from '../../components/Iconfont/Iconeyeopen';
import IconeyeClose from '../../components/Iconfont/Iconeyeclose';
import IconNew from '../../components/Iconfont/Iconnew';
import {Toast} from '../../components/Toast';
import {
  dappDispatch,
  VIEW_STATUS,
  actionTypes,
} from '../../components/DappsWebview';
import {chainInfo, env, url} from '../../config';
import coinsModal from '../../coins';

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

  /**
   * 计算资产总价值
   */
  const assetsValue = React.useMemo(() => {
    let total = 0;

    assetsList.forEach((asset = {}) => {
      const assetValue = coinsModal[(asset.attachSymbol || asset.symbol)].getPriceCNY(asset);
      total += +assetValue ? +assetValue : 0;
    });

    return new BigNumber(total).toFormat(2);
  }, [assetsList, rate]);

  /**
   * 钱包列表、当前钱包
   */
  const walletsList =
    useSelector(state => _get(state, ['wallets', 'walletsList'])) || [];

  const currentWallet =
    useSelector(state => _get(state, ['wallets', 'currentWallet'])) || [];

  /**
   * 是否可以钱包操作
   */
  const canWalletAction = React.useMemo(() => {
    return walletsList.length > 0 && !!currentWallet;
  }, [walletsList, currentWallet]);

  /**
   * 前往转账
   */
  const goTransfer = () => {
    if (canWalletAction) {
      navigate('Transfer');
      return;
    }

    Toast.show({data: i18n.t('actionBeforeCreate')});
  };

  /**
   * 前往收款
   */
  const goCollect = () => {
    if (canWalletAction) {
      navigate('Collect');
      return;
    }

    Toast.show({data: i18n.t('actionBeforeCreate')});
  };

  return (
    <View>
      <AssetCardWrapper>
        <View style={styles.assetWrapper}>
          <TouchableOpacity
            style={styles.assetButton}
            onPress={() => dispatch(appSettingAction.toggleIsShowAssets())}>
            <PrimaryText style={styles.assetsTitle}>
              {i18n.t('myAssets')}({i18n.t('RMB')})
            </PrimaryText>
            {isShowAssets ? (
              <IconeyeOpen size={Math.min(18, vw(7))} />
            ) : (
              <IconeyeClose size={Math.min(18, vw(7))} />
            )}
          </TouchableOpacity>
          <View>
            <H1 color="white" style={styles.assetText}>
              {isShowAssets ? assetsValue : '********'}
            </H1>
          </View>
        </View>
        <View style={styles.contentWrapper}>
          <TouchableOpacity
            style={styles.contentLeft}
            onPress={goTransfer}>
            <Iconliaotianzhuanzhang size={scale(26)} style={{marginRight: 4}} />
            <H4 color="white" style={styles.alignCenter}>{i18n.t('transfer')}</H4>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.contentRight}
            onPress={goCollect}>
            <Iconshoukuan size={scale(26)} style={{marginRight: 2}} />
            <H4 color="white" style={styles.alignCenter}>{i18n.t('collect')}</H4>
          </TouchableOpacity>
        </View>
      </AssetCardWrapper>
      <WalletQuickManager
        show={options =>
          Overlay.push(Overlay.contentTypes.WALLET_QUICK_MANAGER, options)
        }
        canWalletAction={canWalletAction}
      />
      <View style={styles.entrancesWrapper}>
        <TouchableOpacity
          style={styles.entranceBtn}
          onPress={() => {
            const network = env === 'test' ? 'testnet/' : '';
            Linking.openURL(`${chainInfo.explorerUrl}/#/${network}`);
          }}>
          <Image
            resizeMode="contain"
            style={styles.explorerImg}
            source={images.utcExplorer}
          />
          <PrimaryText color="white">UTC Park</PrimaryText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.entranceBtn}
          onPress={() => {
            // Toast.show({data: i18n.t('comingSoon')});
            dappDispatch({
              type: actionTypes.OPEN,
              payload: {uri: url.dapps.otc.url},
            });
          }}>
          <Image
            resizeMode="contain"
            style={styles.entranceImg}
            source={images.otcEntrance}
          />
          <PrimaryText color="white">OTC</PrimaryText>
          <IconNew size={scale(32)} style={styles.iconNew} />
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
    // textAlign: 'center',
    marginRight: 4,
    color: colors.textGrey1,
  },
  contentWrapper: {
    flexDirection: 'row',
    // height: scale(54),
    alignSelf: 'center',
    alignItems: 'center',
    // marginTop: 12,
    paddingVertical: 8,
    // ...Platform.select({
    //   ios: {
    //     shadowColor: colors.theme,
    //     shadowRadius: 10,
    //     shadowOpacity: 0.5,
    //   },
    //   android: {
    //     elevation: 2,
    //   },
    // }),
  },
  assetText: {
    marginRight: 4,
    marginTop: metrics.spaceS,
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  assetWrapper: {
    justifyContent: 'center',
  },
  assetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: vh(1),
  },
  alignCenter: {
    textAlign: 'center',
  },
  divider: {
    width: StyleSheet.hairlineWidth * 2,
    height: '40%',
    backgroundColor: colors.textGrey3,
  },
  entrancesWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: -1,
    bottom: scale(10),
    marginBottom: -scale(10),
  },
  explorerImg: {
    width: scale(60),
    height: scale(60),
  },
  entranceImg: {
    height: scale(60),
    width: scale(60),
  },
  entranceBtn: {
    alignItems: 'center',
  },
  iconNew: {
    position: 'absolute',
    top: -scale(12),
    right: -scale(10),
  },
});
