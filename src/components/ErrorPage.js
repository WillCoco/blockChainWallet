/**
 * @author: Xu Ke
 * @date: 2020/1/8 5:58 PM
 * @Description: 404页面
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {View, ImageBackground, StyleSheet} from 'react-native';
import {H1, H2, PrimaryText} from 'react-native-normalization-text';
import {useNavigation} from 'react-navigation-hooks';
import {vw, vh} from '../helpers/metric';
import colors from '../helpers/colors';

const RootError = () => {
  const {goBack} = useNavigation();

  return (
    <View style={styles.wrapper}>
      {/*<View className="error-code">*/}
        {/*<H2 style={styles.title}>404</H2>*/}
      {/*</View>*/}
      <View>
        <ImageBackground
          resizeMode="contain"
          source={require('../images/error404.png')}
          style={styles.img}
        />
        <PrimaryText style={styles.text}>抱歉，页面走丢了</PrimaryText>
        <PrimaryText style={styles.link} onPress={() => goBack()}>点击这里返回</PrimaryText>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: vh(15),
  },
  title: {
    textAlign: 'center',
  },
  img: {
    height: vw(50),
  },
  text: {
    textAlign: 'center',
  },
  link: {
    textAlign: 'center',
    color: colors.theme,
  },
});

export default RootError;
