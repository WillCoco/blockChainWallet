import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Button} from 'react-native-elements';
import {H1, PrimaryText} from 'react-native-normalization-text';
import _get from 'lodash/get';
import {useNavigation, useIsFocused} from 'react-navigation-hooks';
import i18n from '../../helpers/i18n';
import colors from '../../helpers/colors';
import {metrics, vw} from '../../helpers/metric';

const Guide = () => {
  const {navigate} = useNavigation();
  const walletsList =
    useSelector(state => _get(state, ['wallets', 'walletsList'])) || [];

  const isFocused = useIsFocused();

  React.useEffect(() => {
    // console.log(walletsList.length, 1212);
    if (isFocused && walletsList.length > 0) {
      // 有钱包，进入首页
      navigate('Main');
    }
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.contentWrapper}>
        {/*<H1>Logo</H1>*/}
        <PrimaryText>{i18n.t('appName')}</PrimaryText>
      </View>
      <Button
        containerStyle={styles.createBtnStyle}
        title={i18n.t('createWallet')}
        onPress={() => navigate('CreateWallet')}
      />
      <Button
        containerStyle={styles.importBtnStyle}
        title={i18n.t('importWallet')}
        onPress={() => navigate('ImportWallet')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // backgroundColor: colors.pageBackground,
    flex: 1,
  },
  contentWrapper: {
    height: '64%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  createBtnStyle: {
    width: '60%',
    alignSelf: 'center',
  },
  importBtnStyle: {
    width: '60%',
    alignSelf: 'center',
    marginTop: vw(5),
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '15%',
    marginHorizontal: '4%',
  },
});

export default Guide;
