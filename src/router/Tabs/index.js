/**
 * @author: Xu Ke
 * @date: 2019/12/19 1:51 PM
 * @Description: 主体页面
 * @lastModificationBy: ，
 * @lastModification: ,
 * @lastModificationDate: ,
 */
import React from 'react';
import {Text, View} from 'react-native';

import Home from '../../pages/Home/index';
import Me from '../../pages/Me/Me';
import colors from '../../helpers/colors/index';
import BottomTabsBar from './BottomTabsBar';

import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';

const TabsRouter = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      path: 'main/home',
      navigationOptions: ({navigation}) => ({
        headerTitle: `6'`,
      }),
    },
    Me: {
      screen: Me,
      path: 'main/me',
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Home',
    tabBarComponent: BottomTabsBar,
    defaultNavigationOptions: {
      headerShown: true,
      headerTintColor: '#000',
      headerTitle: '8',
      headerStyle: {
        backgroundColor: '#fff',
        showIcon: true,
      },
    },
    navigationOptions: {
      headerShown: true,
      headerTitle: '7',
    },
    tabBarOptions: {
      activeTintColor: colors.theme,
      inactiveTintColor: colors.textSecondary,
    },
  },
);

export default createAppContainer(TabsRouter);
