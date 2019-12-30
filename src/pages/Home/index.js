import React from 'react';
import {useSelector} from 'react-redux';
import _get from 'lodash/get';
import {useNavigation, useIsFocused} from 'react-navigation-hooks';
import {
  StyleSheet,
  Alert,
} from 'react-native';
import {Toast} from '../../components/Toast/index';
import AssetsList from './AssetsList';
import Dashboard from './Dashboard';

const Home = props => {
  const currentWallet = useSelector(
    state => _get(state, ['wallets', 'currentWallet']) || {},
  );

  const isFocused = useIsFocused();

  const {navigate} = useNavigation();
  // React.useEffect(() => {
  //   查询是否有未备份的
  // }, []);

  //FIXME:
  // React.useEffect(() => {
  //   if (isFocused && currentWallet.address && !currentWallet.backupCompleted) {
  //     Alert.alert(
  //       '提示',
  //       '您当前账户尚未备份，请立即前往备份',
  //       [
  //         {
  //           text: '前往备份',
  //           onPress: () => {
  //             navigate({
  //               routeName: 'WalletBackUpStep1',
  //               key: 'HOME_PAGE',
  //             });
  //           },
  //         },
  //       ],
  //       {cancelable: false},
  //     );
  //   }
  // }, [isFocused, navigate, currentWallet, currentWallet.backupCompleted]);

  return (
    <>
      <Dashboard />
      <AssetsList />
    </>
  );
};

Home.navigationOptions = nav => {
  return {
    headerShown: false,
    title: '123',
  };
};

const styles = StyleSheet.create({
});


export default Home;
