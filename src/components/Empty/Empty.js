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
import {vw} from '../../helpers/metric';

const emptyImg = require('../../images/empty.png');

const Empty = props => {
  return (
    <View style={StyleSheet.flatten([styles.wrapper, props.style])}>
      <ImageBackground source={emptyImg} style={styles.emptyImg}>
        <PrimaryText
          color="secondary"
          style={StyleSheet.flatten([styles.emptyText, props.titleStyle])}>
          {props.title}
        </PrimaryText>
      </ImageBackground>
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
    width: vw(50),
    height: vw(50),
    marginTop: 100,
    justifyContent: 'flex-end',
  },
});

export default Empty;
