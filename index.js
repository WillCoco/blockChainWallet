/**
 * @format
 */
import {AppRegistry, UIManager, Platform} from 'react-native';
import App from './App';
// import {env} from './src/config';
import {name as appName} from './app.json';

if (!__DEV__) {
  window.console.log = () => undefined;
  window.console.warn = () => undefined;
  window.console.info = () => undefined;
  window.console.error = () => undefined;
  window.console.table = () => undefined;
}

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * 全局错误补货
 */
global.ErrorUtils.setGlobalHandler((error) => {
  console.log('全局错误补货：', error);
});

AppRegistry.registerComponent(appName, () => App);
