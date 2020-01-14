/**
 * @author: Xu Ke
 * @date: 2019/12/31 12:03 PM
 * @Description: 对话框组件
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import Dialog from 'react-native-dialog';
import {vw} from '../../helpers/metric/index';
import i18n from '../../helpers/i18n/index';

const PasswordPrompt = props => {
  return (
    <Dialog.Container
      visible={props.visible}
      contentStyle={StyleSheet.flatten([
        styles.wrapperStyle,
        props.wrapperStyle,
      ])}>
      {props.title && (
        <Dialog.Title style={props.titleStyle}>
          {props.title}
        </Dialog.Title>
      )}
      <Dialog.Description style={props.descStyle}>
        {props.description}
      </Dialog.Description>
      {props.showInput && (
        <Dialog.Input
          value={props.value}
          autoFocus={props.autoFocus}
          onChangeText={props.onChangeText}
          placeholder={props.placeholder || i18n.t('passwordValidDesc')}
          style={StyleSheet.flatten([styles.inputStyle, props.inputStyle])}
          wrapperStyle={StyleSheet.flatten([
            styles.inputWrapperStyle,
            props.inputWrapperStyle,
          ])}
          secureTextEntry={props.secureTextEntry}
        />
      )}
      {props.canCancel && (
        <Dialog.Button
          label={props.cancelLabel || i18n.t('cancel')}
          onPress={props.onCancelPress}
          style={props.cancelStyle}
        />
      )}
      <Dialog.Button
        label={props.OKLabel || i18n.t('done')}
        onPress={props.onOKPress}
        style={props.OKStyle}
      />
    </Dialog.Container>
  );
};

PasswordPrompt.defaultProps = {
  visible: false,
  title: '',
  titleStyle: undefined,
  description: '',
  descStyle: undefined,
  value: undefined,
  cancelStyle: undefined,
  OKStyle: undefined,
  canCancel: true,
  onCancelPress: () => undefined,
  onOKPress: () => undefined,
  showInput: false,
  onChangeText: () => undefined,
  inputStyle: undefined,
  inputWrapperStyle: undefined,
  autoFocus: true,
  secureTextEntry: false,
};

const styles = StyleSheet.create({
  wrapperStyle: {
    width: vw(80),
    paddingTop: 0,
  },
  inputStyle: {},
  inputWrapperStyle: Platform.select({
    android: {
      marginBottom: 0,
    },
  }),
});

export default PasswordPrompt;
