import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {Button} from 'react-native-elements';
import {useSelector} from 'react-redux';
import _get from 'lodash/get';
import {PrimaryText} from 'react-native-normalization-text';
import {useNavigation} from 'react-navigation-hooks';
import {vw} from '../../helpers/metric';
import i18n from '../../helpers/i18n';
import {MnemonicPrint} from '../../components/mnemonic';

export default () => {
  const {navigate} = useNavigation();

  const tempMnemonic = useSelector(state =>
    _get(state.wallets, ['tempMnemonic']),
  );

  return (
    <View style={styles.wrapper}>
      <PrimaryText style={styles.textLine1}>
        {i18n.t('backupMnemonicTip1')}
      </PrimaryText>
      <PrimaryText style={styles.textLine2}>
        {i18n.t('backupMnemonicTip2')}
      </PrimaryText>
      <MnemonicPrint
        data={tempMnemonic}
        wrapperStyle={styles.mnemonicWrapper}
      />
      <Button
        containerStyle={styles.btnContainerStyle}
        title={i18n.t('next')}
        onPress={() => navigate('WalletBackUpStep3')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
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
    marginTop: vw(10),
  },
  btnContainerStyle: {
    width: '80%',
    alignSelf: 'center',
    marginTop: vw(10),
  },
});
