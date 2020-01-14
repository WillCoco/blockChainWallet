import {Platform, Dimensions} from 'react-native';
import {DEVICE_WIDTH, DEVICE_HEIGHT} from '../metric';

export const isNotchScreen = () => {
  if (Platform.OS !== 'ios') {
    return false;
  }

  return isIphoneX() || isIphone11();
};

const isIphoneX = () =>
  Platform.OS === 'ios' && (DEVICE_WIDTH === 375 && DEVICE_HEIGHT === 812);

const isIphone11 = () =>
  Platform.OS === 'ios' && (DEVICE_WIDTH === 414 && DEVICE_HEIGHT === 896);
