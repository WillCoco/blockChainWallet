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
import {Icon, Button} from 'react-native-elements';
import i18n from '../../helpers/i18n';
import {PrimaryText} from 'react-native-normalization-text';
import WalletCard from './WalletCard';
import colors from '../../helpers/colors';
import {metrics, vw, vh} from '../../helpers/metric';

export default (props) => {
  const {navigate} = useNavigation();

  // 当前钱包
  const currentWallet = useSelector(
    state => _get(state.wallets, ['currentWallet']) || [],
  );

  // 钱包列表
  const walletsList = useSelector(
    state => _get(state.wallets, ['walletsList']) || [],
  );

  // 恢复钱包
  const recoverWallet = () => {
    if (true) {
      navigate('ImportWallet');
    }
  };

  return (
    <View style={styles.wrapper}>
      {/* 钱包列表 */}
      <View style={styles.content}>
        {
          walletsList.map(item => {
            return (
              <WalletCard 
                key={item.address}
                wallet={item}
                walletName={item.name}
                walletAddress={item.address}
              />
            )
          })
        }
      </View>
      {/* 按钮 */}
      <View style={styles.btns}>
        <Button
          containerStyle={{flex: 1}}
          buttonStyle={StyleSheet.flatten([styles.button, {backgroundColor: colors.success}])}
          title={i18n.t('createWallet')}
          onPress={() => navigate('CreateWallet')}
        />
        <Button
          containerStyle={{flex: 1}}
          buttonStyle={styles.button}
          title={i18n.t('importWallet')}
          onPress={recoverWallet}
        />
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
    width: '100%',
    height: 50,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    backgroundColor: colors.theme,
    borderRadius: 0,
  },
  buttonText: {
    color: '#fff',
    lineHeight: 50,
    textAlign: 'center',
  }
});