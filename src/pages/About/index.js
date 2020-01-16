import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Linking,
} from 'react-native';
import {H4, SmallText} from 'react-native-normalization-text';
import {ListItem, Divider} from 'react-native-elements';
import {useNavigation} from 'react-navigation-hooks';
import i18n from '../../helpers/i18n';
import {vh, vw, metrics} from '../../helpers/metric';
import colors from '../../helpers/colors';
import {url} from '../../config/';
import packageInfo from '../../../package.json';

export default () => {
  const {navigate} = useNavigation();
  return (
    <View style={styles.wrapper}>
      <View style={styles.walletInfoWrapper}>
        <Image
          resizeMode="contain"
          source={require('../../images/logo.png')}
          style={styles.logo}
        />
        <H4 style={styles.appName}>{packageInfo.name}</H4>
        <SmallText style={styles.version}>v {packageInfo.version}</SmallText>
      </View>
      {/*<SmallText>{i18n.t('aboutInter')}</SmallText>*/}
      <View style={styles.listWrapper}>
        <ListItem
          title={i18n.t('userAgreement')}
          containerStyle={styles.listItem}
          chevron
          onPress={() => navigate('UsageAgreement')}
        />
        <Divider style={styles.divider} />
        <ListItem
          title={i18n.t('goWebsite')}
          containerStyle={styles.listItem}
          chevron
          onPress={() => Linking.openURL(`${url.website}/#/download`)}
        />
        {/* <ListItem
        title={i18n.t('privacy')}
        containerStyle={{width: vw(90)}}
        chevron
      /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: colors.pageBackground,
  },
  divider: {
    backgroundColor: colors.divider,
    marginHorizontal: metrics.spaceS,
  },
  walletInfoWrapper: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: vh(6),
  },
  logo: {
    height: vw(12),
  },
  appName: {
    marginTop: vh(1.2),
  },
  version: {
    top: -4,
  },
  listWrapper: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    marginTop: vh(1.5),
  },
  listItem: {
    paddingHorizontal: metrics.spaceS,
  },
});
