/**
 * @author: Xu Ke
 * @date: 2020/2/28 11:29 AM
 * @Description:
 * 页面容器：
 *  1.状态栏颜色等样式控制
 *  2.Navbar
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
import {isAndroid} from '../../helpers/utils/isNotchScreen';

const PageWrapper = props => {
  const defaultStatusBarProps = {
    translucent: true,
    hidden: false,
    barStyle: 'light-content',
    backgroundColor: 'transparent',
  };

  const statusBarProps = {
    ...defaultStatusBarProps,
    ...props.statusBarProps,
  };

  /**
   * tab这类不经常销毁的页面设置预期的状态栏颜色
   */
  const isFocused = useIsFocused();
  React.useEffect(() => {
    if (isFocused) {
      if (statusBarProps.barStyle) {
        StatusBar.setBarStyle(statusBarProps.barStyle);
      }

      if (isAndroid() && statusBarProps.backgroundColor) {
        StatusBar.setBackgroundColor(statusBarProps.backgroundColor);
      }
    }
  }, [isFocused, statusBarProps]);

  return (
    <View style={StyleSheet.flatten([styles.wrapper, props.style])}>
      <StatusBar {...statusBarProps} />
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
    // paddingTop: device.statusBarHeight,
  },
});

export default safePageWrapper;
