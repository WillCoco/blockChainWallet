import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Toast} from '../../components/Toast/index';
import {H1, H2, H3, H4, PrimaryText} from 'react-native-normalization-text';
import {Overlay} from 'react-native-elements';
import {useNavigation} from 'react-navigation-hooks';
import colors from '../../helpers/colors';
import {vh, vw} from '../../helpers/metric';
import i18n from '../../helpers/i18n';

const WalletQuickManager = props => {
  const openOverlay = () => {
    props.setOverlayVisible(true);
  };

  const closeOverlay = () => {
    props.setOverlayVisible(false);
  };

  const checkWallet = () => {
    // checkWallet
    closeOverlay();
  };

  // 前往扫描
  const goScanPage = () => {
    navigate('Scan');
  };

  // 前往创建钱包
  const goCreateWallet = () => {
    closeOverlay();
    navigate({routeName: 'CreateWallet', key: 'CREATE_WALLET'});
  };

  const [top, setTop] = React.useState();

  const {navigate} = useNavigation();

  return (
    <View>
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          onPress={openOverlay}
          onLayout={event => setTop(event.nativeEvent.layout.height)}
          style={styles.checkedWallet}>
          <PrimaryText color="white">
            {props.walletFormat(props.currentWallet) || props.defaultCheckedText}
          </PrimaryText>
        </TouchableOpacity>
        <TouchableOpacity>
          <PrimaryText
            color="white"
            onPress={goScanPage}
          >
            scan
          </PrimaryText>
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
          top,
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
                  {props.walletsList.map((wallet, index) => {
                    return (
                      <TouchableWithoutFeedback
                        key={`wallet_${index}`}
                        onPress={checkWallet}>
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
    </View>
  );
};

WalletQuickManager.defaultProps = {
  overlayVisible: false,
  setOverlayVisible: () => undefined,
  defaultCheckedText: '未选择钱包',
  currentWallet: undefined,
  walletsList: [],
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
