import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {H1, H2, H3, H4, PrimaryText} from 'react-native-normalization-text';
import {useSelector, useDispatch} from 'react-redux';
import _get from 'lodash/get';
import {useNavigation} from 'react-navigation-hooks';
import colors from '../../../helpers/colors';
import {vh, vw} from '../../../helpers/metric';
import safePage from '../../../helpers/safePage';
import {wallet} from '../../../redux/actions';
import i18n from '../../../helpers/i18n';

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

  // 关闭overlay
  const closeOverlay = () => {
    // console.log(props.remove, 'removeeeee')
    props.remove();
  };

  // 切换钱包
  const checkWallet = address => {
    // checkWallet
    dispatch(wallet.updateCurrentWallet(address));
    closeOverlay();
  };

  // 前往创建钱包
  const goCreateWallet = () => {
    closeOverlay();
    navigate({routeName: 'CreateWallet', key: 'HOME_PAGE'});
  };

  const {navigate} = useNavigation();

  return (
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
                      <PrimaryText>{props.walletFormat(wallet)}</PrimaryText>
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
  );
};

const SafeWalletQuickManager = props => safePage(WalletQuickManager, props);

SafeWalletQuickManager.defaultProps = {
  currentWallet: undefined,
  walletFormat: v => v && v.name,
};

const styles = StyleSheet.create({
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

export default SafeWalletQuickManager;
