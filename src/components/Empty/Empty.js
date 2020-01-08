/**
 * @author: Xu Ke
 * @date: 2020/1/6 5:17 PM
 * @Description: 无数据展示
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {View, StyleSheet, Image, ImageBackground} from 'react-native';
import {PrimaryText} from 'react-native-normalization-text';
import i18n from '../../helpers/i18n';

const emptyImg = require('../../images/empty.png');

const Empty = props => {
  return (
    <View style={StyleSheet.flatten([styles.wrapper, props.style])}>
      <ImageBackground 
        source={emptyImg} 
        style={styles.emptyImg}>
      </ImageBackground>
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
  emptyImg: {
    width: 200,
    height: 200,
    marginTop: 100,
  }
});

export default Empty;
