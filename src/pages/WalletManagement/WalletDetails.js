import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {Icon, ListItem} from 'react-native-elements';
import i18n from '../../helpers/i18n';
import {PrimaryText} from 'react-native-normalization-text';


export default (props) => {

  return (
    <ListItem
      style={styles.walletCard}
      title={props.walletName || ''}
      subtitle={props.walletAddress || ''}
      bottomDivider
      chevron
    />
  );
};

const styles = StyleSheet.create({
  walletCard: {
    marginBottom: 15
  },
});