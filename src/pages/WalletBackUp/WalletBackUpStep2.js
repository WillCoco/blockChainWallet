import React from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';
import {Button} from 'react-native-elements';
import {H1, H2, H3, H4, PrimaryText} from 'react-native-normalization-text';
import {useNavigation} from 'react-navigation-hooks';
import colors from '../../helpers/colors';
import i18n from '../../helpers/i18n';

export default () => {
  const {navigate} = useNavigation();
  return (
    <>
      <Text>助记词展示</Text>
      <Text>xlasdklajkldjalkdjlaksdj</Text>
      <Button
        iconRight
        containerStyle={styles.btnContainerStyle}
        title={i18n.t('next')}
        onPress={() => navigate('WalletBackUpStep3')}
      />
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.theme,
    height: '24%',
  },
});
