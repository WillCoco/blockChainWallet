/**
 * @author: Xu Ke
 * @date: 2020/2/28 11:29 AM
 * @Description:
 * 页面容器：
 *  1.状态栏
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';
import safePage from '../../../helpers/safePage/index';
import images from '../../../images/index';
import {vw} from '../../../helpers/metric/index';

const DotsNet = props => {
  return (
    <View style={styles.pageImgBgWrapper}>
      <Image
        source={images.netBg}
        style={StyleSheet.flatten([styles.pageImgBg, props.pageImgStyle])}
      />
    </View>
  );
};

const SafeDotsNet = props => safePage(DotsNet, props);

SafeDotsNet.defaultProps = {
  pageImgStyle: {},
};

const styles = StyleSheet.create({
  pageImgBgWrapper: {
    height: vw(72),
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  pageImgBg: {
    width: '100%',
    height: '100%',
  },
});

export default SafeDotsNet;
