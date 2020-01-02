import React from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';
import {SmallText} from 'react-native-normalization-text';
import {ListItem} from 'react-native-elements';
import i18n from '../../helpers/i18n';
import {vh, vw} from '../../helpers/metric/index';

export default () => {
  return (
    <View style={styles.wrapper}>
      <Image
        style={styles.logo}
        source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
      />
      <SmallText>Version 1.0.0</SmallText>
      <SmallText>简介</SmallText>
      <ListItem
        title={i18n.t('userAgreement')}
        containerStyle={{width: vw(90)}}
        chevron
      />
      <ListItem
        title={i18n.t('privacy')}
        containerStyle={{width: vw(90)}}
        chevron
      />
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
    width: 50,
    height: 50,
    marginTop: vh(3),
  }
});
