import React from 'react';
import {StyleSheet, RefreshControl, ScrollView, StatusBar} from 'react-native';
import {useDispatch} from 'react-redux';
import {useFocusEffect} from 'react-navigation-hooks';
import AssetsList from './AssetsList';
import Dashboard from './Dashboard';
import PasswordValid from './PasswordValid';
import {asset} from '../../redux/actions';
import colors from '../../helpers/colors';

const Home = props => {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = React.useState(false);

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
    setIsLoaded(false);
    await dispatch(asset.getAssetByAddress());
    setRefreshingStatus(false);
    setIsLoaded(true);
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
      <StatusBar backgroundColor={colors.theme} barStyle="light-content" />
      <Dashboard isLoaded={isLoaded} />
      <AssetsList isLoaded={isLoaded} />
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
