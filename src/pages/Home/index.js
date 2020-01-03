import React from 'react';
import {StyleSheet, RefreshControl} from 'react-native';
import {useDispatch} from 'react-redux';
import {useFocusEffect} from 'react-navigation-hooks';
import AssetsList from './AssetsList';
import Dashboard from './Dashboard';
import PasswordValid from './PasswordValid';
import {asset} from '../../redux/actions';

const Home = props => {
  const dispatch = useDispatch();

  // 请求状态
  const [refreshing, setRefreshingStatus] = React.useState(false);

  // 切到home时，获取一次资产
  useFocusEffect(
    React.useCallback(() => {
      getCurrentWalletAssets();
    }, []),
  );

  // 获取资产
  const getCurrentWalletAssets = async () => {
    dispatch(asset.getAssetByAddress());
    setRefreshingStatus(false);
  };

  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={getCurrentWalletAssets}
      style={styles.refreshWrapper}>
      <Dashboard />
      <AssetsList />
      <PasswordValid />
    </RefreshControl>
  );
};

Home.navigationOptions = nav => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  refreshWrapper: {
    // flexDirection: 'column',
    height: '100%',
  },
});

export default Home;
