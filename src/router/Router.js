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
import NavBar from 'react-native-pure-navigation-bar';
import colors from '../helpers/colors';
import {InnerNaviBar} from 'react-native-pure-navigation-bar';
import i18n from '../helpers/i18n';

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


// 导航栏默认样式
InnerNaviBar.defaultProps.style = {
  safeView: {
    backgroundColor: colors.theme,
    height: 50,
    alignItems:'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.textWhite,
    fontWeight: '600',
  },
  gobackImage: {
    width: 10,
  },
  buttonView: {
    color: colors.textWhite,
  },
  gobackView: {
    color: colors.textWhite,
  }
};

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
      navigationOptions: ({navigation}) => ({
        headerTitle: `${i18n.t('transfer')}`,
      }),
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
        headerTitle: `${i18n.t('walletManagement')}`,
      }),
    },
    TransactionHistory: {
      screen: TransactionHistory,
      navigationOptions: ({navigation}) => ({
        headerTitle: `${i18n.t('transactionHistory')}`,
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
    Main: {
      screen: TabsRouter,
      navigationOptions: ({navigation}) => ({
        headerShown: false,
      }),
    },
  },
  {
    initialRouteName: 'TransactionHistory',
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
