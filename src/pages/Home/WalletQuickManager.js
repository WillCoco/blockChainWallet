import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
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

const WalletQuickManager = props => {
  // 当前钱包
  const currentWallet = useSelector(
    state => _get(state.wallets, ['currentWallet']) || [],
  );

  // 打开overlay, 带偏移参数
  const openOverlay = options => {
    console.log(options, 'optionspushhhhhh')
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
        {/*<Icon*/}
          {/*name="wallet-outline"*/}
          {/*type="material-community"*/}
          {/*color={colors.textWhite}*/}
        {/*/>*/}
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
      <TouchableOpacity onPress={goScanPage}>
        <Icon name="scan1" type="antdesign" color={colors.textWhite} />
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
});

export default SafeWalletQuickManager;
