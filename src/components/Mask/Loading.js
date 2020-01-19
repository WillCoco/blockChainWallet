/**
 * @author: Xu Ke
 * @date: 2020/1/17 3:37 PM
 * @Description: loading蒙层
 *  全局模块，独立设计，不依赖store
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {SmallText} from 'react-native-normalization-text';
import i18n from '../../helpers/i18n';
import colors from '../../helpers/colors';
import {metrics, vw, DEVICE_HEIGHT, DEVICE_WIDTH} from '../../helpers/metric';

let setLoading;

const Loading = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    setLoading = setVisible;
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.contentWrapper}>
        <ActivityIndicator color="#fff" />
        <SmallText color="white">{i18n.t('loading')}</SmallText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'absolute',
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperHidden: {
    flex: 1,
    position: 'absolute',
    width: 0,
    height: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    backgroundColor: colors.modalBg,
    paddingHorizontal: metrics.spaceN,
    paddingVertical: metrics.spaceS,
    borderRadius: vw(1),
  },
});

module.exports = {
  View: Loading,
  set: opts => {
    setLoading && setLoading(opts.visible);
  },
};
