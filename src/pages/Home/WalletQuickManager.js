import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {PrimaryText} from 'react-native-normalization-text';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import _get from 'lodash/get';
import {useNavigation} from 'react-navigation-hooks';
import colors from '../../helpers/colors';
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
            containerStyle: {top},
            overlayStyle: {marginTop: top},
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
        <Icon
          name="wallet-outline"
          type="material-community"
          color={colors.textWhite}
        />
        <PrimaryText color="white" style={{marginLeft: 8}}>
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
    paddingHorizontal: 10,
  },
  checkedWallet: {
    // height: vh(5),
    paddingVertical: 10,
    width: '30%',
    flexDirection: 'row',
  },
});

export default SafeWalletQuickManager;
