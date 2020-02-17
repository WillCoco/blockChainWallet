/**
 * @author: Xu Ke
 * @date: 2020/2/16 3:48 PM
 * @Description:
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import images from '../../images';
import {vw, vh} from '../../helpers/metric';
import colors from '../../helpers/colors';
import safePage from '../../helpers/safePage';

const AssetCardWrapper = props => {
  return (
    <ImageBackground
      source={images.netBg}
      style={StyleSheet.flatten([styles.headerWrapper, props.style])}>
      <ImageBackground
        resizeMode="contain"
        source={images.assetDetailCard}
        imageStyle={styles.cardImg}
        style={styles.cardWrapper}>
        <View style={styles.contentWrapper}>{props.children}</View>
      </ImageBackground>
    </ImageBackground>
  );
};

const safeAssetCardWrapper = props => safePage(AssetCardWrapper, props);

safeAssetCardWrapper.defaultProps = {
  style: null,
};

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: colors.theme,
    paddingTop: vh(12),
    // height: '58%',
    // justifyContent: 'flex-end',
  },
  cardWrapper: {
    height: vw(62),
  },
  cardImg: {
    width: '100%',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
  },
  contentWrapper: {
    flex: 1,
    paddingTop: vw(8.5),
    paddingBottom: vw(9.6),
    paddingHorizontal: vw(7.2),
    justifyContent: 'space-between',
  },
});

export default safeAssetCardWrapper;
