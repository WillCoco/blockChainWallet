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
import AssetsList from './AssetsList';
import Dashboard from './Dashboard';
import PasswordValid from './PasswordValid';
import {asset} from '../../redux/actions';
import colors from '../../helpers/colors';
import {vh} from '../../helpers/metric';
import Poller from '../../helpers/utils/poller';
// import {Toast} from '../../components/Toast';
// Toast.loading();

const Home = () => {
  const dispatch = useDispatch();

  const {navigate, replace} = useNavigation();

  useSelector(state =>
    _get(state, ['appSetting', 'language']),
  );

  const [isLoaded, setIsLoaded] = React.useState(false);

  // 请求状态
  const [refreshing, setRefreshingStatus] = React.useState(false);

  /**
   * 第一次进入
   */
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  /**
   * 根据是都有钱包导航分流
   */
  const isFocused = useIsFocused();
  // 钱包列表
  const walletsList =
    useSelector(state => _get(state, ['wallets', 'walletsList'])) || [];
  React.useEffect(() => {
    if (isFocused && walletsList.length === 0) {
      // 无钱包，进入引导
      replace('Guide');
    }
  });

  /**
   * 切到home时，轮询资产
   */
  useFocusEffect(
    React.useCallback(() => {
      const assetsPoller = new Poller({
        interval: 10 * 1000,
        callback: getCurrentWalletAssets,
      });

      assetsPoller.start();
      return () => {
        assetsPoller.stop();
      };
    }, []),
  );

  // 获取资产
  const getCurrentWalletAssets = async () => {
    await dispatch(asset.getAssetByAddress());
    setRefreshingStatus(false);
    setIsLoaded(true);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar backgroundColor={colors.theme} barStyle="light-content" />
        <Dashboard isLoaded={isLoaded} />
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
          contentContainerStyle={{backgroundColor: '#fff'}}>
          <AssetsList isLoaded={isLoaded} />
          <PasswordValid />
        </ScrollView>
      </View>
    </SafeAreaView>
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
  scroll: Platform.select({
    flex: 1,
    backgroundColor: '#fff',
    // android差异
    // android: {
    //   backgroundColor: '#fff',
    // },
  }),
});

export default Home;
