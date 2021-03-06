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
import {WToast} from 'react-native-smart-tip';
import colors from '../../helpers/colors';

// 默认参数
const defaultToastOps = {
  textColor: '#ffffff',
  backgroundColor: colors.modalBg,
  duration: WToast.duration.SHORT, //1.SHORT 2.LONG
  position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
  // icon: <Image source={require('../data/img/success.png')} style={{width: 32,height: 32,resizeMode: 'contain'}}/>,
};
/**
 * api形式的Toast
 * @params {object} options - 配置见https://github.com/mochixuan/react-native-smart-tip
 * @params {string} options.data - toast文本
 * @return void
 */
class Toast extends WToast {
  static show = options => {
    const ops = {
      ...defaultToastOps,
      ...options,
    };
    WToast.show(ops);
  };

  static loading = options => {
    const ops = {
      ...defaultToastOps,
      duration: 100000,
      data: 'Loading...',
      ...options,
    };
    WToast.show(ops);
  };
}

export default {
  Toast,
};
