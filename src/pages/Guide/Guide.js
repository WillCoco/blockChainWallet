import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Button} from 'react-native-elements';
import {useNavigation} from 'react-navigation-hooks';
import i18n from '../../helpers/i18n';
import _get from 'lodash/get';
import colors from '../../helpers/colors';

const Guide = () => {
  const {navigate} = useNavigation();
  const walletsList =
    useSelector(state => _get(state, ['wallets', 'walletsList'])) || [];

  React.useEffect(() => {
    if (walletsList.length > 0) {
      // 有钱包，进入首页
      navigate('Main');
    }
  });

  return (
    <View style={styles.wrapper}>
      <Button
        containerStyle={styles.btnContainerStyle}
        title={i18n.t('complete')}
        onPress={() => navigate('CreatetWallet')}
      />
      <Button
        containerStyle={styles.btnContainerStyle}
        title={i18n.t('complete')}
        onPress={() => navigate('ImportWallet')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.pageBackground,
  },
});

export default Guide;
