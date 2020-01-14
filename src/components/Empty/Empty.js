/**
 * @author: Xu Ke
 * @date: 2020/1/6 5:17 PM
 * @Description: 无数据展示
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {PrimaryText} from 'react-native-normalization-text';
import i18n from '../../helpers/i18n';
import {vw} from '../../helpers/metric';

const emptyImg = require('../../images/empty.png');

const Empty = props => {
  return (
    <View style={StyleSheet.flatten([styles.wrapper, props.style])}>
      <ImageBackground
        source={emptyImg}
        style={styles.imgWrapper}
        imageStyle={styles.img}
      >
        <PrimaryText
          color="secondary"
          style={StyleSheet.flatten([styles.emptyText, props.titleStyle])}>
          {i18n.t('dataEmpty')}
        </PrimaryText>
      </ImageBackground>
    </View>
  );
};

Empty.defaultProps = {
  style: undefined,
  titleStyle: undefined,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
  },
  imgWrapper: {
    width: vw(50),
    height: vw(50),
    alignItems: 'center',
    // width: vw(50),
    // height: vw(50),
    // marginTop: 100,
    justifyContent: 'flex-end',
  },
  img: {
    width: vw(50),
    height: vw(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Empty;
