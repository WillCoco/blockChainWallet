/**
 * @author: Xu Ke
 * @date: 2019/12/19 1:51 PM
 * @Description: 外围页面，登录注册，锁屏等
 * @lastModificationBy: ，
 * @lastModification: ,
 * @lastModificationDate: ,
 */
import React from 'react';
import {Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import TabsRouter from './Tabs/index';
import NormalizationText from '../pages/NormalizationText';
import CreateWallet from '../pages/CreateWallet';
import {
  WalletBackUpStep1,
  WalletBackUpStep2,
  WalletBackUpStep3,
} from '../pages/WalletBackUp';
import ImportWallet from '../pages/ImportWallet';
import Scan from '../pages/Scan';
import AssetDetail from '../pages/AssetDetail';
import Transfer from '../pages/Transfer';
import SelectToken from '../pages/SelectToken';
import SelectBlock from '../pages/SelectToken';
import Collect from '../pages/Collect';
import TransactionHistory from '../pages/TransactionHistory';
import WalletManagement from '../pages/WalletManagement';
import Languages from '../pages/Languages';
import HelpCenter from '../pages/HelpCenter';
import About from '../pages/About';
import WalletDetails from '../pages/WalletDetails';

import colors from '../helpers/colors';

const setNavigation = ({navigation}, title) => ({
    headerShown: false,
    title,
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: colors.theme,
    },
    headerTitleStyle: {
      flex: 1,
    }
  });

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: () => <Text>Login</Text>,
      navigationOptions: ({navigation}) => ({}),
    },
    Register: {
      screen: () => <Text>Register</Text>,
    },
    Lock: {
      screen: () => <Text>Lock</Text>,
    },
    TextManager: {
      screen: NormalizationText,
    },
    CreateWallet: {
      screen: CreateWallet,
    },
    WalletBackUpStep1: {
      screen: WalletBackUpStep1,
    },
    WalletBackUpStep2: {
      screen: WalletBackUpStep2,
    },
    WalletBackUpStep3: {
      screen: WalletBackUpStep3,
    },
    ImportWallet: {
      screen: ImportWallet,
    },
    Scan: {
      screen: Scan,
    },
    AssetDetail: {
      screen: AssetDetail,
    },
    Transfer: {
      screen: Transfer,
    },
    Collect: {
      screen: Collect,
    },
    SelectToken: {
      screen: SelectToken,
    },
    SelectBlock: {
      screen: SelectBlock,
    },
    WalletManagement: {
      screen: WalletManagement,
      // navigationOptions: setNavigation({}, '钱包管理'),
      navigationOptions: ({navigation}) => ({
        headerShown: false,
      }),
    },
    TransactionHistory: {
      screen: TransactionHistory,
      navigationOptions: setNavigation({}, '交易记录'),
    },
    Languages: {
      screen: Languages,
      navigationOptions: setNavigation({}, '语言设置'),
    },
    HelpCenter: {
      screen: HelpCenter,
      navigationOptions: setNavigation({}, '帮助中心'),
    },
    About: {
      screen: About,
      navigationOptions: setNavigation({}, '关于我们'),
    },
    WalletDetails: {
      screen: WalletDetails,
      navigationOptions: setNavigation({}, '钱包详情'),
    },
    Main: {
      screen: TabsRouter,
      navigationOptions: ({navigation}) => ({
        headerShown: false,
      }),
    },
  },
  {
    initialRouteName: 'Main',
    // navigationOptions: {
    //   headerTintColor: '#000',
    //   headerShown: true,
    //   headerTitle: '3',
    //   title: '4',
    // },
  },
);



const App = createAppContainer(AppNavigator);

export default App;
