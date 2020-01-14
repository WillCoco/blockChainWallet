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
import {useDispatch} from 'react-redux';
import {useFocusEffect} from 'react-navigation-hooks';
import AssetsList from './AssetsList';
import Dashboard from './Dashboard';
import PasswordValid from './PasswordValid';
import {asset} from '../../redux/actions';
import colors from '../../helpers/colors';
import {vh} from '../../helpers/metric';
import Poller from '../../helpers/utils/poller';

const Home = () => {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = React.useState(false);

  // 请求状态
  const [refreshing, setRefreshingStatus] = React.useState(false);

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
    setIsLoaded(false);
    await dispatch(asset.getAssetByAddress());
    setRefreshingStatus(false);
    setIsLoaded(true);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      {/*<View style={styles.bg} />*/}
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getCurrentWalletAssets}
            colors={[colors.theme]}
            tintColor="#fff"
          />
        }
        keyboardShouldPersistTaps="handled"
        stickyHeaderIndices={[1]}
        style={styles.scroll}>
        <StatusBar backgroundColor={colors.theme} barStyle="light-content" />
        <Dashboard isLoaded={isLoaded} />
        <AssetsList isLoaded={isLoaded} />
        <PasswordValid />
      </ScrollView>
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
    // android差异
    android: {
      backgroundColor: '#fff',
    },
  }),
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: vh(24),
    width: '100%',
    backgroundColor: colors.theme,
  },
});

export default Home;
