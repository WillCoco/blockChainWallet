import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {Icon} from 'react-native-elements';
import i18n from '../../helpers/i18n';
import {PrimaryText} from 'react-native-normalization-text';
import WalletCard from './WalletCard';
import colors from '../../helpers/colors';

export default () => {
  return (
    <View style={styles.wrapper}>
      {/* 钱包列表 */}
      <View style={styles.content}>
        {
          [1,2].map(item => {
            return (
              <WalletCard 
                walletName='123'
                walletAddress='12312'
              />
            )
          })
        }
      </View>
      {/* 按钮 */}
      <View style={styles.btns}>
        <View style={styles.button}>
          <PrimaryText style={styles.buttonText}>{i18n.t('createWallet')}</PrimaryText>
        </View>
        <View style={StyleSheet.flatten([styles.button, {backgroundColor: '#2890fe'}])}>
          <PrimaryText style={styles.buttonText}>{i18n.t('importWallet')}</PrimaryText>
        </View>
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
    color: "#fff",
    lineHeight: 50,
    textAlign: 'center',
  }
});
