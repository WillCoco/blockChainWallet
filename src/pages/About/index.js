import React from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';
import {SmallText} from 'react-native-normalization-text';
import {ListItem} from 'react-native-elements';
import {useNavigation} from 'react-navigation-hooks';
import i18n from '../../helpers/i18n';
import {vh, vw, metrics} from '../../helpers/metric';
import packageInfo from '../../../package.json';

export default () => {
  const {navigate} = useNavigation();
  return (
    <View style={styles.wrapper}>
      <Image
        resizeMode="contain"
        source={require('../../images/logo.png')}
        style={styles.logo}
      />
      <SmallText>Version {packageInfo.version}</SmallText>
      {/*<SmallText>{i18n.t('aboutInter')}</SmallText>*/}
      <ListItem
        title={i18n.t('userAgreement')}
        containerStyle={{width: vw(90)}}
        chevron
        onPress={() => navigate('UsageAgreement')}
      />
      {/* <ListItem
        title={i18n.t('privacy')}
        containerStyle={{width: vw(90)}}
        chevron
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logo: {
    height: vw(12),
    marginTop: metrics.spaceL,
    marginBottom: 8,
  },
});
