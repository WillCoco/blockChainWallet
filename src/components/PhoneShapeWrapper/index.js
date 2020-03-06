/**
 * @author: Xu Ke
 * @date: 2020/2/16 3:48 PM
 * @Description: 手机形状
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {vw, metrics} from '../../helpers/metric';
import colors from '../../helpers/colors';
import safePage from '../../helpers/safePage';

const PhoneShapeWrapper = props => {
  return (
    <View style={StyleSheet.flatten([styles.historyWrapper, {...props.style}])}>
      <View style={styles.shape} />
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  historyWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: metrics.spaceS,
    borderTopLeftRadius: metrics.spaceN,
    borderTopRightRadius: metrics.spaceN,
    overflow: 'hidden',
  },
  shape: {
    height: 5,
    width: vw(10),
    backgroundColor: colors.disable,
    alignSelf: 'center',
    marginVertical: metrics.spaceS,
    borderRadius: 2.5,
  },
});

const safePhoneShapeWrapper = props => safePage(PhoneShapeWrapper, props);

export default safePhoneShapeWrapper;
