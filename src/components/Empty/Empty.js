/**
 * @author: Xu Ke
 * @date: 2020/1/6 5:17 PM
 * @Description: 无数据展示
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {PrimaryText} from 'react-native-normalization-text';
import i18n from '../../helpers/i18n';

const Empty = props => {
  return (
    <View style={StyleSheet.flatten([styles.wrapper, props.style])}>
      <PrimaryText
        style={StyleSheet.flatten([styles.emptyText, props.titleStyle])}>
        {props.title}
      </PrimaryText>
    </View>
  );
};

Empty.defaultProps = {
  style: undefined,
  titleStyle: undefined,
  title: i18n.t('dataEmpty'),
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
  },
});

export default Empty;
