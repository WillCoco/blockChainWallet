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
  const needInputPress = props.onChangeText || props.value;
  const pointerEvents = props.onPress ? {pointerEvents: 'none'} : null;
  return (
    <View style={styles.wrapper}>
      <ListItem
        {...props}
        containerStyle={StyleSheet.flatten([
          styles.containerStyle,
          props.containerStyle,
        ])}
      />
      {needInputPress ? (
        <TextInput
          {...pointerEvents}
          keyboardType={props.keyboardType}
          placeholder={props.placeholder}
          placeholderTextColor={colors.textDark1}
          style={StyleSheet.flatten([styles.input, props.inputStyle])}
          value={props.value}
          onChangeText={props.onChangeText}
          editable={props.editable}
          maxLength={props.maxLength}
          autoFocus={props.autoFocus}
          secureTextEntry={props.secureTextEntry}
        />
      ) : null}
      {props.attachment}
    </View>
  );
};

FormRow.defaultProps = {
  value: '',
  onChangeText: undefined,
  containerStyle: undefined,
  keyboardType: 'default',
  editable: true,
  secureTextEntry: false,
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
  },
  containerStyle: {
    borderColor: colors.divider,
  },
  input: {
    color: colors.textTitle,
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
