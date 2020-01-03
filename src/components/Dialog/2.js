/**
 * @author: Xu Ke
 * @date: 2019/12/31 12:03 PM
 * @Description: 对话框组件
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {Overlay, Button} from 'react-native-elements';
import {H3, PrimaryText} from 'react-native-normalization-text';
import {vw} from '../../helpers/metric/index';
import i18n from '../../helpers/i18n/index';

const PasswordPrompt = props => {
  const input = React.useRef();
  return (
    <Overlay
      isVisible={props.visible}
      overlayStyle={[
        StyleSheet.flatten([styles.overlayStyle, props.overlayStyle])
      ]}>
      <View>
        <H3>123</H3>
        <PrimaryText>123</PrimaryText>
        <TextInput
          ref={c => input.current = c}
          placeholder={props.placeholder}
          value={props.value}
          onChangeText={props.onChangeText}
        />

        <View style={StyleSheet.flatten([styles.btnsWrapper, props.btnsWrapper])}>
          <Button
            title={props.cancelLabel}
            type="clear"
            onPress={props.onCancelPress}
          />
          <Button
            title={props.OKLabel}
            type="clear"
            onPress={props.onOKPress}
          />
        </View>
      </View>
    </Overlay>
  );
};

PasswordPrompt.defaultProps = {
  visible: false,
  title: '',
  titleStyle: undefined,
  description: '',
  descStyle: undefined,
  placeholder: '请输入内容',
  value: undefined,
  cancelLabel: '取消',
  cancelStyle: undefined,
  OKLabel: '确定',
  OKStyle: undefined,
  canCancel: true,
  onCancelPress: () => undefined,
  onOKPress: () => undefined,
  showInput: false,
  onChangeText: () => undefined,
  inputStyle: undefined,
  inputWrapperStyle: undefined,
  btnsWrapper: undefined
};

const styles = StyleSheet.create({
  wrapperStyle: {
    width: vw(80),
    paddingTop: 0,
  },
  overlayStyle: {
    borderWidth: 1,
    height: 'auto',
    width: vw(80),
  },
  inputWrapperStyle: {
    marginBottom: 0,
  },
  btnsWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderWidth: 1
  }
});

export default PasswordPrompt;
