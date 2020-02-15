import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  Linking,
} from 'react-native';
import {PrimaryText, scale} from 'react-native-normalization-text';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import _get from 'lodash/get';
import {useNavigation} from 'react-navigation-hooks';
import colors from '../../helpers/colors';
import {vh, vw, metrics} from '../../helpers/metric';
import safePage from '../../helpers/safePage';
import i18n from '../../helpers/i18n';
import {isNotchScreen} from '../../helpers/utils/isNotchScreen';
import {Overlay} from '../../components/Mask';
import Iconscan from '../../components/Iconfont/Iconscan';
import {
  dappDispatch,
  VIEW_STATUS,
  actionTypes,
} from '../../components/DappsWebview';
import images from '../../images';
import {chainInfo, env, dapps} from '../../config';

const WalletQuickManager = props => {
  // 当前钱包
  const currentWallet = useSelector(
    state => _get(state.wallets, ['currentWallet']) || [],
  );

  // 打开overlay, 带偏移参数
  const openOverlay = options => {
    Overlay.push(Overlay.contentTypes.WALLET_QUICK_MANAGER, options);
  };

  // 前往扫描
  const goScanPage = () => {
    navigate('Scan');
  };

  const [top, setTop] = React.useState();

  const {navigate} = useNavigation();

  return (
    <View style={styles.headerWrapper}>
      <TouchableOpacity
        onPress={() =>
          openOverlay({
            containerStyle: {top: top + 10},
            overlayStyle: {marginTop: top + 10},
          })
        }
        onLayout={event => {
          // 普通android
          let topDistance = event.nativeEvent.layout.height;
          if (isNotchScreen()) {
            // 刘海屏
            topDistance += 44;
          } else if (Platform.OS === 'ios') {
            // 无刘海ios
            topDistance += 20;
          }
          setTop(topDistance);
        }}
        style={styles.checkedWallet}>
        <PrimaryText
          numberOfLines={1}
          ellipsizeMode="tail"
          color="white"
          style={{marginLeft: 8, maxWidth: vw(20)}}>
          {props.walletFormat(currentWallet) || i18n.t('noSelectedWallet')}
        </PrimaryText>
        {props.overlayVisible ? (
          <Icon name="arrow-drop-up" color={colors.textWhite} />
        ) : (
          <Icon name="arrow-drop-down" color={colors.textWhite} />
        )}
      </TouchableOpacity>
      <View style={styles.entrancesWrapper}>
        <TouchableOpacity
          onPress={() => {
            const network = env === 'test' ? 'testnet/' : '';
            Linking.openURL(`${chainInfo.explorerUrl}/#/${network}`);
          }}>
          <Image
            resizeMode="contain"
            style={styles.explorerImg}
            source={images.utcExplorer}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dappDispatch({
              type: actionTypes.OPEN,
              payload: {uri: dapps.otc.url},
            });
          }}>
          <Image
            resizeMode="contain"
            style={styles.entranceImg}
            source={images.otcEntrance}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={goScanPage}>
        <Iconscan size={scale(20)} />
      </TouchableOpacity>
    </View>
  );
};

const SafeWalletQuickManager = props => safePage(WalletQuickManager, props);

SafeWalletQuickManager.defaultProps = {
  overlayVisible: false,
  currentWallet: undefined,
  walletFormat: v => v && v.name,
};

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: metrics.spaceS,
  },
  checkedWallet: {
    height: scale(28),
    maxWidth: '40%',
    minWidth: '24%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: colors.textGrey3,
    borderRadius: scale(14),
  },
  entrancesWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    right: '15%',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    flex: -1,
    height: scale(30),
  },
  explorerImg: {
    width: scale(24),
    marginRight: scale(16),
  },
  entranceImg: {
    width: scale(40),
  },
});

export default SafeWalletQuickManager;
