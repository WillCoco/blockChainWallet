/**
 * @author: Xu Ke
 * @date: 2019/12/19 1:51 PM
 * @Description: 主体页面
 * @lastModificationBy: ，
 * @lastModification: ,
 * @lastModificationDate: ,
 */
import React from 'react';
import Home from '../../pages/Home/index';
import Me from '../../pages/Me/index';
import colors from '../../helpers/colors/index';
import safePage from '../../helpers/safePage';
import BottomTabsBar from './BottomTabsBar';

import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

const TabsRouter = createBottomTabNavigator(
  {
    Home: {
      screen: props => safePage(Home, props),
      path: 'main/home',
      navigationOptions: ({navigation}) => ({
        gestureEnabled: false,
      }),
    },
    Me: {
      screen: props => safePage(Me, props),
      path: 'main/me',
      navigationOptions: {
        // headerShown: false,
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
