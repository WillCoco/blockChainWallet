/**
 * @format
 */
import {AppRegistry, UIManager, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

if (!__DEV__) {
  window.console.log = () => undefined;
  window.console.warn = () => undefined;
  window.console.info = () => undefined;
  window.console.table = () => undefined;
}

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

AppRegistry.registerComponent(appName, () => App);
