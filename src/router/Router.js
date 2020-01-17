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
import safePage from '../helpers/safePage';

const AppNavigator = createStackNavigator(
  {
    Guide: {
      screen: props => safePage(Guide, props),
      navigationOptions: ({navigation}) => ({
        headerShown: false,
        header: null,
        gestureEnabled: false,
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
      screen: props => safePage(NormalizationText, props),
    },
    CreateWallet: {
      screen: props => safePage(CreateWallet, props),
      navigationOptions: ({navigation}) => ({
        headerTitle: i18n.t('createWallet'),
      }),
    },
    WalletBackUpStep1: {
      screen: props => safePage(WalletBackUpStep1, props),
      navigationOptions: ({navigation}) => ({
        headerTitle: i18n.t('backupWallet'),
      }),
    },
    WalletBackUpStep2: {
      screen: props => safePage(WalletBackUpStep2, props),
      navigationOptions: ({navigation}) => ({
        headerTitle: i18n.t('backupWallet'),
      }),
    },
    WalletBackUpStep3: {
      screen: props => safePage(WalletBackUpStep3, props),
      navigationOptions: ({navigation}) => ({
        headerTitle: i18n.t('backupWallet'),
      }),
    },
    ImportWallet: {
      screen: props => safePage(ImportWallet, props),
      navigationOptions: ({navigation}) => ({
        headerTitle: i18n.t('importWallet'),
      }),
    },
    Scan: {
      screen: props => safePage(Scan, props),
      navigationOptions: ({navigation}) => ({
        headerTitle: i18n.t('scan'),
      }),
    },
    AssetDetail: {
      screen: props => safePage(AssetDetail, props),
      navigationOptions: ({navigation}) => {
        return {
          headerTitle: navigation.getParam('tokenSymbol'),
        };
      },
    },
    Transfer: {
      screen: props => safePage(Transfer, props),
      navigationOptions: ({navigation}) => ({
        headerTitle: `${i18n.t('transfer')}`,
      }),
    },
    Collect: {
      screen: props => safePage(Collect, props),
      navigationOptions: ({navigation}) => ({
        headerTitle: `${i18n.t('collect')}`,
      }),
    },
    SelectToken: {
      screen: props => safePage(SelectToken, props),
      navigationOptions: ({navigation}) => ({
        headerTitle: i18n.t('selectToken'),
      }),
    },
    SelectBlock: {
      screen: props => safePage(SelectBlock, props),
      navigationOptions: ({navigation}) => ({
        headerTitle: i18n.t('selectBlock'),
      }),
    },
    WalletManagement: {
      screen: props => safePage(WalletManagement, props),
      navigationOptions: ({navigation}) => ({
        headerTitle: `${i18n.t('walletManagement')}`,
      }),
    },
    TransactionHistory: {
      screen: props => safePage(TransactionHistory, props),
      navigationOptions: ({navigation}) => ({
        headerShown: false,
        header: null,
      }),
    },
    DealDetails: {
      screen: props => safePage(DealDetails, props),
      navigationOptions: ({navigation}) => ({
        headerShown: false,
        headerTitle: `${i18n.t('dealDetails')}`,
      }),
    },
    SwitchAccount: {
      screen: props => safePage(SwitchAccount, props),
      navigationOptions: ({navigation}) => ({
        headerTitle: `${i18n.t('switchAccount')}`,
      }),
    },
    Languages: {
      screen: props => safePage(Languages, props),
      navigationOptions: ({navigation}) => ({
        headerTitle: `${i18n.t('languages')}`,
      }),
    },
    HelpCenter: {
      screen: props => safePage(HelpCenter, props),
      navigationOptions: ({navigation}) => ({
        headerTitle: `${i18n.t('helpCenter')}`,
      }),
    },
    About: {
      screen: props => safePage(About, props),
      navigationOptions: ({navigation}) => ({
        headerTitle: `${i18n.t('about')}`,
      }),
    },
    WalletDetails: {
      screen: props => safePage(WalletDetails, props),
      navigationOptions: ({navigation}) => ({
        // headerTitle: `${i18n.t('about')}`,
        headerShown: false,
        header: null,
      }),
    },
    UsageAgreement: {
      screen: props => safePage(UsageAgreement, props),
      navigationOptions: ({navigation}) => ({
        // headerTitle: `${i18n.t('about')}`,
        headerTitle: i18n.t('userAgreement'),
      }),
    },
    Main: {
      screen: TabsRouter,
      navigationOptions: ({navigation}) => ({
        // headerShown: false,
        header: null,
        gestureEnabled: false,
      }),
    },
  },
  {
    initialRouteName: 'Main',
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
