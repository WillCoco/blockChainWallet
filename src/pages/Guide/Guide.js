import React from 'react';
import {View, StyleSheet, Animated, Image, StatusBar} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Button} from 'react-native-elements';
import {H4} from 'react-native-normalization-text';
import _get from 'lodash/get';
import {useNavigation, useIsFocused} from 'react-navigation-hooks';
import i18n from '../../helpers/i18n';
import {metrics, vw} from '../../helpers/metric';
import SplashScreen from 'react-native-splash-screen';
import packageInfo from '../../../package.json';

const Guide = () => {
  const {navigate, replace} = useNavigation();

  // 钱包列表
  const walletsList =
    useSelector(state => _get(state, ['wallets', 'walletsList'])) || [];

  const isFocused = useIsFocused();

  React.useEffect(() => {
    SplashScreen.hide(); // 隐藏启动图
  });

  /**
   * 同步语言
   */
  const language = useSelector(
    state => `${_get(state, ['appSetting', 'language'])}`,
  );
  React.useEffect(() => {
    if (language && language.toLowerCase) {
      console.log(language, 'language');
      i18n.changeLanguage(language);
    }
  }, [language]);

  /**
   * 是否显示按钮
   */
  const [btnsAnim] = React.useState(new Animated.Value(0));

  /**
   * 开始动画
   */
  const startAnim = () => {
    Animated.timing(
      // timing方法使动画值随时间变化
      btnsAnim, // 要变化的动画值
      {
        toValue: 1, // 最终的动画值
        duration: 500,
      },
    ).start();
  };

  /**
   * 复原动画
   */
  const recoverAnim = () => {
    Animated.timing(
      // timing方法使动画值随时间变化
      btnsAnim, // 要变化的动画值
      {
        toValue: 0, // 最终的动画值
        duration: 500,
      },
    ).start();
  };

  /**
   * 根据是都有钱包导航分流
   */
  React.useEffect(() => {
    if (isFocused && walletsList.length > 0) {
      // 有钱包，进入首页
      setTimeout(() => {
        replace('Main');
      }, 1000);
    } else {
      startAnim();
    }
  });

  return (
    <View style={styles.wrapper}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.logoWrapper}>
        {/*<H1>Logo</H1>*/}
        <Image
          resizeMode="contain"
          source={require('../../images/logo.png')}
          style={styles.logo}
        />
        <H4 color="primary" style={styles.appName}>{packageInfo.name}</H4>
      </View>
      {
        <Animated.View
          style={{
            opacity: btnsAnim,
            top: btnsAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [vw(10), 0],
            }),
          }}>
          <Button
            containerStyle={styles.createBtnStyle}
            title={i18n.t('createWallet')}
            onPress={() => {
              navigate('CreateWallet');
            }}
          />
          <Button
            type="outline"
            containerStyle={styles.importBtnStyle}
            title={i18n.t('importWallet')}
            onPress={() => {
              navigate('ImportWallet');
            }}
          />
        </Animated.View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // backgroundColor: colors.pageBackground,
    flex: 1,
  },
  logo: {
    height: vw(20),
  },
  logoWrapper: {
    height: '64%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  appName: {
    marginTop: metrics.spaceS,
  },
  createBtnStyle: {
    width: '60%',
    alignSelf: 'center',
  },
  importBtnStyle: {
    width: '60%',
    alignSelf: 'center',
    marginTop: vw(5),
  },
  btnsHideStyle: {
    opacity: 0,
    backgroundColor: 'red',
    // top: vw(10),
  },
  btnsShowStyle: {
    opacity: 1,
    backgroundColor: 'green',
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '15%',
    marginHorizontal: '4%',
  },
});

export default Guide;
