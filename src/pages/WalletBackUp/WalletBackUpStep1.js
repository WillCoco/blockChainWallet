import React from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import _get from 'lodash/get';
import {Button} from 'react-native-elements';
import {H1, H2, H3, H4, PrimaryText} from 'react-native-normalization-text';
import {useNavigation} from 'react-navigation-hooks';
import colors from '../../helpers/colors';
import {vw} from '../../helpers/metric';
import i18n from '../../helpers/i18n';

const WalletBackUpStep1 = props => {
  const {navigate} = useNavigation();

  return (
    <>
      <PrimaryText style={styles.textLine1}>钱包创建成功</PrimaryText>
      <PrimaryText style={styles.textLine2}>请备份钱包</PrimaryText>
      <Button
        containerStyle={styles.btnContainerStyle}
        title={i18n.t('backupWallet')}
        onPress={() => navigate('WalletBackUpStep2')}
      />
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.theme,
    height: '24%',
  },
  textLine1: {
    textAlign: 'center',
    marginTop: '10%',
  },
  textLine2: {
    textAlign: 'center',
  },
  mnemonicWrapper: {
    marginHorizontal: '2%',
    marginTop: '10%',
  },
  btnContainerStyle: {
    width: '80%',
    alignSelf: 'center',
    marginTop: '15%',
  },
});

export default WalletBackUpStep1;
