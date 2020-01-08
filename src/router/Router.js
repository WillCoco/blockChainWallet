/**
 * @author: Xu Ke
 * @date: 2019/12/19 1:51 PM
 * @Description: 外围页面，登录注册，锁屏等
 * @lastModificationBy: ，
 * @lastModification: ,
 * @lastModificationDate: ,
 */
import React from 'react';
import {Text, View, Image} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import TabsRouter from './Tabs/index';
import NormalizationText from '../pages/NormalizationText';
import Guide from '../pages/Guide';
import CreateWallet from '../pages/CreateWallet';
import {
  WalletBackUpStep1,
  WalletBackUpStep2,
  WalletBackUpStep3,
} from '../pages/WalletBackUp';
import colors from '../helpers/colors';
// import NavBar, {InnerNaviBar} from 'react-native-pure-navigation-bar';
import NavBar from '../components/NavBar';
import i18n from '../helpers/i18n';

import ImportWallet from '../pages/ImportWallet';
import Scan from '../pages/Scan';
import AssetDetail from '../pages/AssetDetail';
import Transfer from '../pages/Transfer';
import SelectToken from '../pages/SelectToken';
import SelectBlock from '../pages/SelectToken';
import Collect from '../pages/Collect';
import TransactionHistory from '../pages/TransactionHistory';
import SwitchAccount from '../pages/TransactionHistory/SwitchAccount';
import WalletManagement from '../pages/WalletManagement';
import Languages from '../pages/Languages';
import HelpCenter from '../pages/HelpCenter';
import About from '../pages/About';
import WalletDetails from '../pages/WalletDetails';
import DealDetails from '../pages/DealDetails';
import UsageAgreement from '../pages/UsageAgreement';

const AppNavigator = createStackNavigator(
  {
    Guide: {
      screen: Guide,
      navigationOptions: ({navigation}) => ({
        headerShown: false,
      }),
    },
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
      navigationOptions: ({navigation}) => ({
        headerTitle: i18n.t('createWallet'),
      }),
    },
    WalletBackUpStep1: {
      screen: WalletBackUpStep1,
      navigationOptions: ({navigation}) => ({
        headerTitle: i18n.t('backupWallet'),
      }),
    },
    WalletBackUpStep2: {
      screen: WalletBackUpStep2,
      navigationOptions: ({navigation}) => ({
        headerTitle: i18n.t('backupWallet'),
      }),
    },
    WalletBackUpStep3: {
      screen: WalletBackUpStep3,
      navigationOptions: ({navigation}) => ({
        headerTitle: i18n.t('backupWallet'),
      }),
    },
    ImportWallet: {
      screen: ImportWallet,
      navigationOptions: ({navigation}) => ({
        headerTitle: i18n.t('importWallet'),
      }),
    },
    Scan: {
      screen: Scan,
      navigationOptions: ({navigation}) => ({
        headerTitle: i18n.t('scan'),
      }),
    },
    AssetDetail: {
      screen: AssetDetail,
      navigationOptions: ({navigation}) => {
        return {
          headerTitle: navigation.getParam('tokenSymbol'),
        };
      },
    },
    Transfer: {
      screen: Transfer,
      navigationOptions: ({navigation}) => ({
        headerTitle: `${i18n.t('transfer')}`,
      }),
    },
    Collect: {
      screen: Collect,
      navigationOptions: ({navigation}) => ({
        headerTitle: `${i18n.t('collect')}`,
      }),
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
        headerTitle: `${i18n.t('walletManagement')}`,
      }),
    },
    TransactionHistory: {
      screen: TransactionHistory,
      navigationOptions: ({navigation}) => ({
        headerShown: false,
      }),
    },
    DealDetails: {
      screen: DealDetails,
      navigationOptions: ({navigation}) => ({
        headerShown: false,
        headerTitle: `${i18n.t('dealDetails')}`,
      }),
    },
    SwitchAccount: {
      screen: SwitchAccount,
      navigationOptions: ({navigation}) => ({
        headerTitle: `${i18n.t('switchAccount')}`,
      }),
    },
    Languages: {
      screen: Languages,
      navigationOptions: ({navigation}) => ({
        headerTitle: `${i18n.t('languages')}`,
      }),
    },
    HelpCenter: {
      screen: HelpCenter,
      navigationOptions: ({navigation}) => ({
        headerTitle: `${i18n.t('helpCenter')}`,
      }),
    },
    About: {
      screen: About,
      navigationOptions: ({navigation}) => ({
        headerTitle: `${i18n.t('about')}`,
      }),
    },
    WalletDetails: {
      screen: WalletDetails,
      navigationOptions: ({navigation}) => ({
        // headerTitle: `${i18n.t('about')}`,
        headerShown: false,
      }),
    },
    UsageAgreement: {
      screen: UsageAgreement,
      navigationOptions: ({navigation}) => ({
        // headerTitle: `${i18n.t('about')}`,
        headerTitle: i18n.t('userAgreement'),
      }),
    },
    Main: {
      screen: TabsRouter,
      navigationOptions: ({navigation}) => ({
        headerShown: false,
      }),
    },
  },
  {
    initialRouteName: 'Guide',
    defaultNavigationOptions: ({navigation}) => {
      return {
        headerTitle: `默认标题`,
        header: nav => {
          // navigationOptions优先级：
          // createStackNavigator.RouteConfigs.navigationOptions >
          // Component.navigationOptions >
          // StackNavigatorConfig.defaultNavigationOptions >
          const {
            title,
            headerTitle,
            headerRight,
            headerLeft,
          } = nav.scene.descriptor.options;
          // console.log(nav.scene.descriptor.options, 'options');
          return (
            <NavBar
              title={headerTitle || title}
              hasSeperatorLine={false}
              rightElement={headerRight && headerRight(nav)}
              // leftElement={headerLeft ? headerLeft(nav) : <Text style={{color: colors.textWhite}}>back</Text>}
              gobackImage={require('../images/backBtn.png')}
            />
          );
        },
      };
    },
    // navigationOptions: {
    //   headerTintColor: '#000',
    //   headerShown: true,
    //   headerTitle: '3',
    //   title: '4',
    // },
    // navigationOptions: {
    //   headerTitle: '222',
    // }
  },
);

const App = createAppContainer(AppNavigator);

export default App;
