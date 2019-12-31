/**
 * @author: Xu Ke
 * @date: 2019/12/19 4:40 PM
 * @Description:
 *  Toast组件，带默认参数
 *  https://github.com/mochixuan/react-native-smart-tip
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import RootToast from 'react-native-root-toast';

// 默认参数
const defaultToastOps = {
  duration: RootToast.durations.LONG, //1.SHORT 2.LONG
  position: RootToast.positions.BOTTOM, // 1.TOP 2.CENTER 3.BOTTOM
  shadow: true,
  animation: true,
  hideOnPress: true,
  delay: 0,
  // icon: <Image source={require('../data/img/success.png')} style={{width: 32,height: 32,resizeMode: 'contain'}}/>,
};
/**
 * api形式的Toast
 * @params {object} options - 配置见https://github.com/mochixuan/react-native-smart-tip
 * @params {string} options.data - toast文本
 * @return void
 */
const show = (data, options) => {
  const ops = {...defaultToastOps, ...options};
  RootToast.show(data, ops);
};

module.exports = {
  ...RootToast,
  show,
};
