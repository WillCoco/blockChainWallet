import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Linking,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {H4, SmallText} from 'react-native-normalization-text';
import {ListItem, Divider} from 'react-native-elements';
import {useNavigation} from 'react-navigation-hooks';
import _get from 'lodash/get';
import i18n from '../../helpers/i18n';
import {vh, vw, metrics} from '../../helpers/metric';
import colors from '../../helpers/colors';
import {url} from '../../config/';
import packageInfo from '../../../package.json';
import {Overlay, Loading} from '../../components/Mask';
import {update} from '../../redux/actions';
import {Toast} from '../../components/Toast';

export default () => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();

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
          title={i18n.t('checkUpdate')}
          containerStyle={styles.listItem}
          chevron
          onPress={() => {
            Loading.set({visible: true});

            // 检查更新
            dispatch(update.checkVersion())
              .then(info => {
                if (!info) {
                  return;
                }

                if (info.expired) {
                  // 原生包过期
                  console.log('apk过期', 'checkUpdate_111');
                  Overlay.unshift(Overlay.contentTypes.UPDATER, {
                    customData: {info},
                  });
                } else if (info.upToDate) {
                  // 您的应用版本已是最新
                  Toast.show({data: i18n.t('noNewVersion')});
                  console.log('您的应用版本已是最新', 'checkUpdate_222');
                } else {
                  console.log('有更新', 'checkUpdate_333');
                  // 这里因为是手动检查的，忽略静默属性
                  Overlay.unshift(Overlay.contentTypes.UPDATER, {
                    customData: {info},
                  });
                }
              })
              .finally(() => {
                Loading.set({visible: false});
              });
          }}
        />
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
