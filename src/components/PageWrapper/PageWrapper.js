/**
 * @author: Xu Ke
 * @date: 2020/2/28 11:29 AM
 * @Description:
 * 页面容器：
 *  1.状态栏颜色等样式控制
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {useIsFocused} from 'react-navigation-hooks';
import safePage from '../../helpers/safePage';
import device from '../../helpers/utils/device';

const PageWrapper = props => {
  /**
   * tab这类不经常销毁的页面设置预期的状态栏颜色
   */
  const isFocused = useIsFocused();
  React.useEffect(() => {
    if (isFocused) {
      StatusBar.setBarStyle(props.statusBarProps.barStyle);
    }
  });

  return (
    <View style={StyleSheet.flatten([styles.wrapper, props.style])}>
      <StatusBar {...props.statusBarProps} />
      {props.pageBackgroundImg}
      <View style={{flex: 1}}>{props.children}</View>
    </View>
  );
};

const safePageWrapper = props => safePage(PageWrapper, props);

safePageWrapper.defaultProps = {
  statusBarProps: {
    translucent: true,
    hidden: false,
    barStyle: 'light-content',
    backgroundColor: 'transparent',
  },
  pageBackgroundImg: null,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: device.statusBarHeight,
  },
});

export default safePageWrapper;
