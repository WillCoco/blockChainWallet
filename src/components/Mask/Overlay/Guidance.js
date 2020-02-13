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
} from 'react-native';
import {SmallText, PrimaryText, scale} from 'react-native-normalization-text';
import {useSelector, useDispatch} from 'react-redux';
import _get from 'lodash/get';
import {useNavigation} from 'react-navigation-hooks';
import {Icon, ListItem, Overlay as Overl, Button} from 'react-native-elements';
import colors from '../../../helpers/colors';
import {vh, vw, metrics} from '../../../helpers/metric';
import safePage from '../../../helpers/safePage';
import {wallet} from '../../../redux/actions';
import i18n from '../../../helpers/i18n';
import {Toast} from '../../../components/Toast';
import Icon1 from '../../../components/Iconfont/Iconliaotianzhuanzhang';

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
      <View style={styles.contentWrapper}>
        {content}
        <Icon1 size={scale(40)} style={styles.close} onPress={() => props.remove()} />
      </View>
    </View>
  );
};

const SafeSecretExportExport = props => safePage(SecretExport, props);

SafeSecretExportExport.defaultProps = {
  backgroundImg: null,
  onConfirm: () => undefined,
  buttonTitle: null,
};

const radius = vw(2);
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    backgroundColor: '#fff',
    width: vw(90),
    height: vw(120),
    borderRadius: radius,
    alignItems: 'center',
    marginBottom: vw(10),
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
  },
  button: {},
  close: {
    position: 'absolute',
    bottom: -vw(14),
  },
});

export default SafeSecretExportExport;
