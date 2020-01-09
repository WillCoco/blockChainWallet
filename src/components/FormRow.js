import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import {PrimaryText} from 'react-native-normalization-text';
import colors from '../helpers/colors';

const FormRow = props => {
  return (
    <View style={styles.wrapper}>
      <ListItem
        {...props}
        containerStyle={StyleSheet.flatten([
          styles.containerStyle,
          props.containerStyle,
        ])}
      />
      <TextInput
        keyboardType={props.keyboardType}
        placeholder={props.placeholder}
        style={StyleSheet.flatten([styles.input, props.inputStyle])}
        value={props.value}
        onChangeText={props.onChangeText}
        editable={props.editable}
        maxLength={props.maxLength}
        autoFocus={props.autoFocus}
        secureTextEntry={props.secureTextEntry}
      />
    </View>
  );
};

FormRow.defaultProps = {
  value: '',
  onChangeText: () => undefined,
  containerStyle: undefined,
  keyboardType: 'default',
  editable: true,
  secureTextEntry: false,
};

const styles = StyleSheet.create({
  containerStyle: {
    borderColor: colors.divider,
  },
  input: {
    width: '94%',
    position: 'absolute',
    bottom: 0,
    paddingLeft: '30%',
    paddingRight: '4%',
    height: '100%',
    zIndex: 99,
  },
});

export default FormRow;
