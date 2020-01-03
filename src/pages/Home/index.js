import React from 'react';
import {StyleSheet, RefreshControl, ScrollView} from 'react-native';
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
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={getCurrentWalletAssets}
        />
      }
      keyboardShouldPersistTaps="handled"
      stickyHeaderIndices={[0]}>
      <Dashboard />
      <AssetsList />
      <PasswordValid />
    </ScrollView>
  );
};

Home.navigationOptions = nav => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({});

export default Home;
