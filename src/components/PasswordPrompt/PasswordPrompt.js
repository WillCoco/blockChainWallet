import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {H1, H2, PrimaryText} from 'react-native-normalization-text';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import Dialog from 'react-native-dialog';
import useI18n from '../hooks/useI18n';
import {vh, vw, metrics} from '../../helpers/metric/index';
import i18n from '../../helpers/i18n/index';
import colors from '../../helpers/colors/index';

const PasswordPrompt = props => {
  return (
    <View style={StyleSheet.flatten([styles.wrapper, props.wrapperStyle])}>
      <Dialog.Container visible={props.visible}>
        <Dialog.Title>{props.title}</Dialog.Title>
        <Dialog.Description>
          {props.description}
        </Dialog.Description>
        <Dialog.Button label="Cancel" />
        <Dialog.Button label="Delete" />
      </Dialog.Container>
    </View>
  );
};

PasswordPrompt.defaultProps = {
  visible: false,
  title: '标题',
  description: '内容',
  value: undefined,
  onChangeText: () => undefined,
  onPressOk: () => undefined,
  onPressCancel: () => undefined,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },

});

export default PasswordPrompt;
