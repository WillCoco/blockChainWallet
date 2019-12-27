import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from 'react-navigation-hooks';
import _get from 'lodash/get';
import {Icon} from 'react-native-elements';
import i18n from '../../helpers/i18n';
import {PrimaryText} from 'react-native-normalization-text';
import WalletCard from './WalletCard';
import colors from '../../helpers/colors';

export default () => {
  const {navigate} = useNavigation();

  // 当前钱包
  const currentWallet = useSelector(
    state => _get(state.wallets, ['currentWallet']) || [],
  );

  // 钱包列表
  const walletsList = useSelector(
    state => _get(state.wallets, ['walletsList']) || [],
  );

  return (
    <View style={styles.wrapper}>
      {/* 钱包列表 */}
      <View style={styles.content}>
        {walletsList.map(wallet => {
          return (
            <WalletCard
              walletName={wallet.name}
              walletAddress={wallet.address}
            />
          );
        })}
      </View>
      {/* 按钮 */}
      <View style={styles.btns}>
        <TouchableOpacity style={styles.button}>
          <PrimaryText style={styles.buttonText}>{i18n.t('createWallet')}</PrimaryText>
        </TouchableOpacity>
        <TouchableOpacity
          style={StyleSheet.flatten([
            styles.button,
            {backgroundColor: '#2890fe'},
          ])}
          onPress={() => navigate('ImportWallet')}>
          <PrimaryText style={styles.buttonText}>{i18n.t('importWallet')}</PrimaryText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.pageBackground,
    height: '100%',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  btns: {
    height: 50,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    backgroundColor: '#4ed8b5',
    width: '50%',
  },
  buttonText: {
    color: '#fff',
    lineHeight: 50,
    textAlign: 'center',
  }
});
