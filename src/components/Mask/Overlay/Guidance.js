/**
 * @author: Xu Ke
 * @date: 2020/2/13 10:35 AM
 * @Description: 引导类弹窗
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {scale} from 'react-native-normalization-text';
import {Button} from 'react-native-elements';
import {vw, metrics} from '../../../helpers/metric';
import safePage from '../../../helpers/safePage';
import colors from '../../../helpers/colors';
import {Toast} from '../../../components/Toast';
import IconCloseCircle from '../../../components/Iconfont/Iconclosecircle';

const SecretExport = props => {
  const onPress = () => {
    props.onConfirm();
    props.remove();
  };

  const button = props.buttonText ? (
    <Button
      containerStyle={styles.buttonWrapper}
      buttonStyle={styles.button}
      title={props.buttonText}
      onPress={onPress}
    />
  ) : null;

  const content = props.backgroundImg ? (
    <ImageBackground
      source={props.backgroundImg}
      style={styles.imageBackground}>
      {button}
    </ImageBackground>
  ) : (
    <View style={styles.imageBackground}>{button}</View>
  );

  return (
    <View style={styles.wrapper}>
      <View style={{alignItems: 'center'}}>
        <View
          style={StyleSheet.flatten([
            styles.contentWrapper,
            props.contentWrapperStyle,
          ])}>
          {content}
        </View>
        <TouchableOpacity style={styles.close} onPress={() => props.remove()}>
          <IconCloseCircle size={scale(35)} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SafeSecretExportExport = props => safePage(SecretExport, props);

SafeSecretExportExport.defaultProps = {
  backgroundImg: null,
  onConfirm: () => undefined,
  buttonTitle: null,
  contentWrapperStyle: null,
};

const radius = vw(2);
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    width: vw(76),
    height: vw(120),
    borderRadius: radius,
    alignItems: 'center',
  },
  imageBackground: {
    flex: 1,
    padding: metrics.spaceS,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: radius,
    overflow: 'hidden',
  },
  buttonWrapper: {
    width: '50%',
    maxWidth: 250,
    bottom: '10%',
  },
  button: {
    backgroundColor: colors.success,
  },
  close: {
    marginTop: vw(4),
  },
});

export default SafeSecretExportExport;
