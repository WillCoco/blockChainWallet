import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  InteractionManager,
  Animated,
  Easing,
  Image,
  Alert,
  Vibration,
  Dimensions,
  Platform
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useNavigation} from 'react-navigation-hooks';
import _split from 'lodash/split';

const ScannerScreen = () => {

  const {navigate} = useNavigation();
  const [show, setShow] = useState(true);
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const startAnimation = () => {
    if (show) {
      animation.setValue(0);
      Animated.timing(animation, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
      }).start(() => startAnimation());
    }
  };

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      startAnimation();
    });
    return () => {
      setShow(false);
    }
  });

  // todo：参数解析根据键值
  const barcodeReceived = (e) => {
    if (show) {
      setShow(false);
      if (e) {
        Vibration.vibrate([0, 500], false);
        let result = e.data;
        let transferData = {};
        transferData['address'] = _split(_split(result, '?')[0], ':')[1];
        transferData[_split(_split(_split(result, '?')[1], '&')[0], '=')[0]] = _split(_split(_split(result, '?')[1], '&')[0], '=')[1];
        transferData[_split(_split(_split(result, '?')[1], '&')[1], '=')[0]] = _split(_split(_split(result, '?')[1], '&')[1], '=')[1];
        navigate('Transfer', transferData);
      } else {
        Alert.alert(
          '提示',
          '扫描失败，请将手机对准二维码重新尝试',
          [
            {
              text: '确定', onPress: () => {
              setShow(true);
            }
            }
          ],
          {cancelable: false}
        )
      }
    }
  };

  let scanView = null;
  if (Platform.OS === 'ios') {
    scanView = (
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        flashMode={RNCamera.Constants.FlashMode.auto}
        onBarCodeRead={(e) => barcodeReceived(e)}
      >
        <View style={{height: (height - 264) / 3, width: width, backgroundColor: 'rgba(0,0,0,0.5)',}}>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.itemStyle} />
          <View style={styles.rectangle}>
            <Image
              style={[styles.rectangle, {position: 'absolute', left: 0, top: 0}]}
              // source={require('../image/icon_scan_rect.png')}
            />
            <Animated.View style={[styles.animatedStyle, {
              transform: [{
                translateY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 200]
                })
              }]
            }]}>
            </Animated.View>
          </View>
          <View style={styles.itemStyle}/>
        </View>
        <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', width: width, alignItems: 'center'}}>
          <Text style={styles.textStyle}>将二维码放入框内，即可自动扫描</Text>
        </View>
      </RNCamera>
    )
  } else {
    scanView = (
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        googleVisionBarcodeType={RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.QR_CODE}
        flashMode={RNCamera.Constants.FlashMode.auto}
        onBarCodeRead={(e) => barcodeReceived(e)}
      >
        <View style={{height: (height - 244) / 3, width: width, backgroundColor: 'rgba(0,0,0,0.5)',}}>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.itemStyle}/>
          <View style={styles.rectangle}>
            <Image
              style={[styles.rectangle, {position: 'absolute', left: 0, top: 0}]}
              // source={require('../image/icon_scan_rect.png')}
            />
            <Animated.View style={[styles.animatedStyle, {
              transform: [{
                translateY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 200]
                })
              }]
            }]}>
            </Animated.View>
          </View>
          <View style={styles.itemStyle}/>
        </View>
        <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', width: width, alignItems: 'center'}}>
          <Text style={styles.textStyle}>将二维码放入框内，即可自动扫描</Text>
        </View>
      </RNCamera>
    )
  }
  return (
    <View style={styles.container}>
      {scanView}
    </View>
  );
}

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
  },
  itemStyle: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: (width - 200) / 2,
    height: 200
  },
  textStyle: {
    color: '#fff',
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 18
  },
  animatedStyle: {
    height: 2,
    backgroundColor: '#00c050'
  },
  rectangle: {
    height: 200,
    width: 200,
  }
});


export default ScannerScreen;