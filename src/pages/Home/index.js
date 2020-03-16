import React from 'react';
import {
  View,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useIsFocused} from 'react-navigation-hooks';
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
// import NavBar from '../../components/NavBar';
import PageWrapper from '../../components/PageWrapper';
import DotsNet from '../../components/PageWrapper/PageBackgrounds/DotsNet';

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
   * 第一次进入
   */
  React.useEffect(() => {
    SplashScreen.hide();

    // 一直轮询
    const assetsPoller = new Poller({
      interval: 10 * 100000,
      callback: () => {
        getCurrentWalletAssets();
        dispatch(asset.updateExchangeRate());
      },
    });

    assetsPoller.start();

    return () => {
      assetsPoller.stop();
    };
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

  /**
   * 资产列表
   */
  const assetsList = useSelector(
    state => _get(state, ['assets', 'assetsList']) || [],
  );

  const isShowEmpty = isLoaded && assetsList.length === 0;

  return (
    <PageWrapper
      style={styles.wrapper}
      pageBackgroundImg={<DotsNet />}
      statusBarProps={{barStyle: 'light-content'}}>
      <View style={{flex: 1}}>
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
            style={StyleSheet.flatten([
              styles.scroll,
              {backgroundColor: isShowEmpty ? '#fff' : 'transparent'},
            ])}
            contentContainerStyle={{backgroundColor: colors.pageBackground}}>
            <AssetsList isLoaded={isLoaded} />
            <PasswordValid />
          </ScrollView>
        </PhoneShapeWrapper>
        <CheckOverlay />
      </View>
    </PageWrapper>
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
