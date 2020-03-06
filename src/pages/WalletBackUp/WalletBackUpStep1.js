import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
// import _get from 'lodash/get';
import {Button} from 'react-native-elements';
import {H1, H2, H3, H4, PrimaryText, scale} from 'react-native-normalization-text';
import {useNavigation} from 'react-navigation-hooks';
import colors from '../../helpers/colors';
import {vw, metrics} from '../../helpers/metric';
import i18n from '../../helpers/i18n';

const WalletBackUpStep1 = props => {
  const {navigate} = useNavigation();

  return (
    <View styles={styles.wrapper}>
      <H4 style={styles.textLine1}>{i18n.t('backupTipsTitle')}</H4>
      <PrimaryText style={styles.textLine2}>{i18n.t('backupTips')}</PrimaryText>
      <PrimaryText style={styles.title}>
        {i18n.t('backupMnemonicTitle')}
      </PrimaryText>
      <PrimaryText style={styles.contentBackup}>
        {i18n.t('backupMnemonic1')}
      </PrimaryText>
      <PrimaryText style={styles.contentBackup}>
        {i18n.t('backupMnemonic2')}
      </PrimaryText>
      <PrimaryText style={styles.title}>
        {i18n.t('backupOfflineTitle')}
      </PrimaryText>
      <PrimaryText style={styles.contentSave}>
        {i18n.t('backupOffline1')}
      </PrimaryText>
      <PrimaryText style={styles.contentSave}>
        {i18n.t('backupOffline2')}
      </PrimaryText>
      <Button
        title={i18n.t('next')}
        onPress={() => navigate('WalletBackUpStep2')}
        containerStyle={styles.btnContainerStyle}
        buttonStyle={styles.btnStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
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
  contentBackup: {
    marginHorizontal: metrics.spaceL,
    // color: colors.textSecondary,
  },
  title: {
    marginHorizontal: metrics.spaceL,
    marginTop: metrics.spaceL,
    color: colors.textBlack,
  },
  contentSave: {
    marginHorizontal: metrics.spaceL,
    // color: colors.textSecondary,
  },
  mnemonicWrapper: {
    marginHorizontal: '2%',
    marginTop: '10%',
  },
  btnContainerStyle: {
    width: '100%',
    paddingHorizontal: metrics.spaceS,
    alignSelf: 'center',
    marginTop: vw(10),
  },
  btnStyle: {
    backgroundColor: colors.theme,
    height: scale(58),
    borderRadius: vw(2),
  },
});

export default WalletBackUpStep1;
