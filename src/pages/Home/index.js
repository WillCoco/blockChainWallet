import React from 'react';
import {
  SafeAreaView,
  View,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useNavigation, useIsFocused} from 'react-navigation-hooks';
import _get from 'lodash/get';
import SplashScreen from 'react-native-splash-screen';
import {H4, scale} from 'react-native-normalization-text';
import AssetsList from './AssetsList';
import Dashboard from './Dashboard';
import PasswordValid from './PasswordValid';
import CheckOverlay from './CheckOverlay';
import {asset} from '../../redux/actions';
import colors from '../../helpers/colors';
import {vh, metrics} from '../../helpers/metric';
import Poller from '../../helpers/utils/poller';
import i18n from '../../helpers/i18n';
import PhoneShapeWrapper from '../../components/PhoneShapeWrapper';
import NavBar from '../../components/NavBar';

// import {Toast} from '../../components/Toast';
// Toast.loading();

const Home = () => {
  const dispatch = useDispatch();

  const {navigate, replace} = useNavigation();

  useSelector(state => _get(state, ['appSetting', 'language']));

  const [isLoaded, setIsLoaded] = React.useState(false);

  // 请求状态
  const [refreshing, setRefreshingStatus] = React.useState(false);

  /**
   * 快速切换和创建钱包的overlay
   */
  // const [overlayVisible, setOverlayVisible] = React.useState(false);

  /**
   * 第一次进入
   */
  React.useEffect(() => {
    SplashScreen.hide();

    StatusBar.setBarStyle('light-content');

    // // 检查更新
    // dispatch(update.checkVersion()).then(async info => {
    //   // console.log(info, 'checkUpdate_home');
    //   if (!info) {
    //     return;
    //   }
    //
    //   if (info.expired) {
    //     // 原生包过期
    //     console.log('apk过期', 'checkUpdate_111');
    //     Overlay.unshift(Overlay.contentTypes.UPDATER, {
    //       customData: {info},
    //     });
    //   } else if (info.upToDate) {
    //     // 您的应用版本已是最新
    //     console.log('您的应用版本已是最新', 'checkUpdate_222');
    //   } else {
    //     console.log('有更新', 'checkUpdate_333');
    //     // 这里因为是手动检查的，忽略静默属性
    //     if (_get(info, ['metaInfo', 'silent'])) {
    //       // 静默下载
    //       const hash = await update.doDownload(info);
    //
    //       // 下次重启生效
    //       update.doSwitch(hash, false);
    //     } else {
    //       // 非静默下载
    //       Overlay.unshift(Overlay.contentTypes.UPDATER, {
    //         customData: {info},
    //       });
    //     }
    //   }
    // });
  }, []);

  /**
   * 重启后从持久化同步语言
   */
  const language = useSelector(
    state => `${_get(state, ['appSetting', 'language'])}`,
  );
  React.useEffect(() => {
    if (language && language.toLowerCase) {
      console.log(language, 'language');
      i18n.changeLanguage(language);
    }
  }, [language]);

  /**
   * 根据是否有钱包导航分流
   */
  const isFocused = useIsFocused();
  // 钱包列表
  const walletsList =
    useSelector(state => _get(state, ['wallets', 'walletsList'])) || [];
  React.useEffect(() => {
    if (isFocused && walletsList.length === 0) {
      // 无钱包，进入引导
      setTimeout(() => {
        replace('Guide');
      }, 0);
    } else {
      // 直至轮询
      const assetsPoller = new Poller({
        interval: 10 * 1000,
        callback: () => {
          getCurrentWalletAssets();
          dispatch(asset.updateExchangeRate());
        },
      });

      assetsPoller.start();
      return () => {
        assetsPoller.stop();
      };
    }
  });

  /**
   * 切到home时，轮询资产
   */
  // useFocusEffect(
  //   React.useCallback(() => {
  //     const assetsPoller = new Poller({
  //       interval: 10 * 1000,
  //       callback: getCurrentWalletAssets,
  //     });
  //
  //     assetsPoller.start();
  //     return () => {
  //       assetsPoller.stop();
  //     };
  //   }, []),
  // );

  // 获取资产
  const getCurrentWalletAssets = async () => {
    await dispatch(asset.getAssetByAddress());
    setRefreshingStatus(false);
    setIsLoaded(true);
  };

  return (
    <View style={styles.wrapper}>
      <View style={{flex: 1, backgroundColor: colors.theme}}>
        <StatusBar backgroundColor={colors.theme} barStyle="light-content" />
        <Dashboard isLoaded={isLoaded} />
        <PhoneShapeWrapper>
          <H4 style={styles.assetsTitle}>{i18n.t('allAssets')}</H4>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={getCurrentWalletAssets}
                colors={[colors.theme]}
                tintColor={colors.theme}
              />
            }
            keyboardShouldPersistTaps="handled"
            // stickyHeaderIndices={[1]}
            style={styles.scroll}
            contentContainerStyle={{backgroundColor: colors.pageBackground}}>
            <AssetsList isLoaded={isLoaded} />
            <PasswordValid />
          </ScrollView>
        </PhoneShapeWrapper>
        <CheckOverlay />
      </View>
    </View>
  );
};

Home.navigationOptions = nav => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  // safearea颜色
  wrapper: {
    flex: 1,
    backgroundColor: colors.theme,
  },
  scroll: {
    backgroundColor: colors.pageBackground,
  },
  assetsTitle: {
    fontSize: scale(14),
    marginHorizontal: metrics.spaceN,
    // marginTop: vh(6.5),
  },
});

export default Home;
