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
import WalletDetails from '../pages/WalletManagement/WalletDetails';

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
      navigationOptions: ({navigation}) => ({
        headerShown: true,
        title: '管理钱包',
        headerStyle: {
          backgroundColor: '#2890fe',
        },
        headerTitleStyle: {
          color: '#ffffff',
          textAlign: 'center',
        },
        headerBackTitleStyle: {
          color: '#ffffff',
        }
      }),
    },
    TransactionHistory: {
      screen: TransactionHistory,
      navigationOptions: ({navigation}) => ({
        headerShown: true,
        title: '交易记录',
      }),
    },
    Languages: {
      screen: Languages,
      navigationOptions: ({navigation}) => ({
        headerShown: true,
        title: '语言设置',
      }),
    },
    HelpCenter: {
      screen: HelpCenter,
      avigationOptions: ({navigation}) => ({
        headerShown: true,
        title: '帮助中心',
      }),
    },
    About: {
      screen: About,
      avigationOptions: ({navigation}) => ({
        headerShown: true,
        title: '关于我们',
      }),
    },
    WalletDetails: {
      screen: WalletDetails,
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
