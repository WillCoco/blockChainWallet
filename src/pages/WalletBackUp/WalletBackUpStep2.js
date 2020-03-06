import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native';
import {Button} from 'react-native-elements';
import {useSelector} from 'react-redux';
import _get from 'lodash/get';
import {PrimaryText, scale} from 'react-native-normalization-text';
import {useNavigation} from 'react-navigation-hooks';
import {vw} from '../../helpers/metric';
import i18n from '../../helpers/i18n';
import colors from '../../helpers/colors';
import {MnemonicPrint} from '../../components/mnemonic';
import PhoneShapeWrapper from '../../components/PhoneShapeWrapper';

export default () => {
  const {navigate} = useNavigation();

  const tempMnemonic = useSelector(state =>
    _get(state.wallets, ['tempMnemonic']),
  );

  return (
    <View style={styles.wrapper}>
      <PhoneShapeWrapper>
        <ScrollView>
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
            buttonStyle={styles.btnStyle}
            title={i18n.t('next')}
            onPress={() => navigate('WalletBackUpStep3')}
          />
        </ScrollView>
      </PhoneShapeWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.theme,
  },
  textLine1: {
    textAlign: 'center',
    marginTop: '6%',
  },
  textLine2: {
    textAlign: 'center',
  },
  mnemonicWrapper: {
    // marginHorizontal: '2%',
    marginTop: vw(6),
  },
  btnContainerStyle: {
    width: '80%',
    alignSelf: 'center',
    marginTop: vw(10),
  },
  btnStyle: {
    backgroundColor: colors.theme,
    height: scale(58),
    borderRadius: vw(2),
  },
});
