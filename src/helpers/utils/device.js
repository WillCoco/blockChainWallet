/**
 * @author: Xu Ke
 * @date: 2020/2/28 11:51 AM
 * @Description: 设备信息
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import {
  StatusBar,
} from 'react-native';
import {isAndroid, isNotchScreen} from './isNotchScreen';

const device = {
  get statusBarHeight() {
    if (isAndroid()) {
      return StatusBar.currentHeight;
    }

    if (isNotchScreen()) {
      return 44;
    }

    return 20;
  },
};

module.exports = device;
