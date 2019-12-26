import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Button, ListItem} from 'react-native-elements';
import {PrimaryText} from 'react-native-normalization-text';
import {useControllableValue} from '@umijs/hooks';
import {metrics, vw} from '../helpers/metric/index';

const FormRow = props => {
  const [value, setValue] = useControllableValue(props);

  const onChange = v => {
    if (props.isValid && props.isValid(v)) {
      setValue(v);
    }
  };

  return (
    <View style={styles.wrapper}>
      <ListItem
        {...props}
      />
      <TextInput
        keyboardType={props.keyboardType}
        placeholder={props.placeholder}
        style={StyleSheet.flatten([styles.input, props.inputStyle])}
        value={value}
        onChange={onChange}
        editable={props.editable}
      />
    </View>
  );
};

FormRow.defaultProps = {
  keyboardType: 'default',
  editable: true,
}

const styles = StyleSheet.create({
  wrapper: {
  },
  input: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: '24%',
    height: '100%',
  },
});

export default FormRow;
