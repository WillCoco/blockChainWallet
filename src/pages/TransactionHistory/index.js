import React from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';
import {PrimaryText} from 'react-native-normalization-text';
import {vh, vw, metrics} from '../../helpers/metric';

export default () => {
  const [empty, setEmpty] = React.useState(true);

  return (
    <>
      {
        empty 
        && <PrimaryText style={styles.empty}>空空如也~</PrimaryText>
        || <Text>History</Text>
      }
    </>
  );
};

const styles = StyleSheet.create({
  empty: {
    textAlign: 'center',
  },
});