/**
 * @author: Xu Ke
 * @date: 2019/12/25 11:23 AM
 * @Description: 尺寸度量，
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import {Dimensions} from 'react-native';

const {height: DEVICE_HEIGHT, width: DEVICE_WIDTH} = Dimensions.get('window');

const percentMetric = (metric, value = 0) => {
  value = Math.min(value, 100);
  value = Math.max(value, 0);
  return parseInt((metric * value) / 100);
};

const vh = value => percentMetric(DEVICE_HEIGHT, value);

const vw = value => percentMetric(DEVICE_WIDTH, value);

module.exports = {
  DEVICE_WIDTH,
  DEVICE_HEIGHT,
  vh,
  vw,
};
