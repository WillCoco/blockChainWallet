import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {Toast} from '../../components/Toast/index';
import {H1, H2, H3, H4, PrimaryText} from 'react-native-normalization-text';
import {Overlay, Icon} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import _get from 'lodash/get';
import {useNavigation} from 'react-navigation-hooks';
import colors from '../../helpers/colors';
import {vh, vw} from '../../helpers/metric';
import {wallet} from '../../redux/actions';
import i18n from '../../helpers/i18n';
import HomeContext from './HomeContext';

const WalletQuickManager = props => {
  const dispatch = useDispatch();

  // 当前钱包
  const currentWallet = useSelector(
    state => _get(state.wallets, ['currentWallet']) || [],
  );

  // 钱包列表
  const walletsList = useSelector(
    state => _get(state.wallets, ['walletsList']) || [],
  );

  // 打开overlay
  const openOverlay = () => {
    props.setOverlayVisible(true);
  };

  // 关闭overlay
  const closeOverlay = () => {
    props.setOverlayVisible(false);
  };

  // 切换钱包
  const checkWallet = address => {
    // checkWallet
    dispatch(wallet.updateCurrentWallet(address));
    closeOverlay();
  };

  // 前往扫描
  const goScanPage = () => {
    navigate('Scan');
  };

  // 前往创建钱包
  const goCreateWallet = () => {
    closeOverlay();
    navigate({routeName: 'CreateWallet', key: 'HOME_PAGE'});
  };

  const [top, setTop] = React.useState();

  const {navigate} = useNavigation();

  return (
    <>
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          onPress={openOverlay}
          onLayout={event => setTop(event.nativeEvent.layout.height)}
          style={styles.checkedWallet}>
          <Icon name="wallet-outline" type='material-community' color={colors.textWhite}/>
          <PrimaryText color="white"  style={{marginLeft: 8}}>
            {props.walletFormat(currentWallet) || props.defaultCheckedText}
          </PrimaryText>
          {
            props.overlayVisible 
            && <Icon name='arrow-drop-up'  color={colors.textWhite}/>
            || <Icon name='arrow-drop-down' color={colors.textWhite}/>
          }
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="scan1" type='antdesign' color={colors.textWhite} onPress={goScanPage}/>
        </TouchableOpacity>
      </View>
      <Overlay
        isVisible={props.overlayVisible}
        windowBackgroundColor="rgba(0,0,0,.5)"
        overlayBackgroundColor="transparent"
        width="auto"
        height="auto"
        onBackdropPress={closeOverlay}
        containerStyle={{
          top,
        }}
        overlayStyle={{
          marginTop: top,
          borderColor: 'red',
          flex: 1,
          backgroundColor: 'transparent',
          alignSelf: 'stretch',
          padding: 0,
        }}>
        <TouchableWithoutFeedback onPress={closeOverlay} style={{flex: 1}}>
          <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={{backgroundColor: '#fff'}}>
              <TouchableWithoutFeedback>
                <View>
                  {walletsList.map((wallet, index) => {
                    return (
                      <TouchableWithoutFeedback
                        key={`wallet_${index}`}
                        onPress={() => checkWallet(_get(wallet, 'address'))}>
                        <View style={styles.walletRow}>
                          <PrimaryText>
                            {props.walletFormat(wallet)}
                          </PrimaryText>
                        </View>
                      </TouchableWithoutFeedback>
                    );
                  })}
                  <TouchableOpacity
                    style={styles.createWallet}
                    onPress={goCreateWallet}>
                    <H4>+ {i18n.t('createWallet')}</H4>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </Overlay>
    </>
  );
};

WalletQuickManager.defaultProps = {
  overlayVisible: false,
  setOverlayVisible: () => undefined,
  defaultCheckedText: '未选择钱包',
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
  walletRow: {
    height: vh(8),
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderColor: colors.divider,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  createWallet: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: vw(3),
  },
});

export default WalletQuickManager;
