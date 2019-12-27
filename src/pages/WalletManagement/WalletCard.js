import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {Icon, ListItem} from 'react-native-elements';
import i18n from '../../helpers/i18n';
import {PrimaryText} from 'react-native-normalization-text';
import {useNavigation} from 'react-navigation-hooks';

export default (props) => {
  const {navigate} = useNavigation();

  return (
    <ListItem
      style={styles.walletCard}
      title={props.walletName || ''}
      subtitle={props.walletAddress || ''}
      onPress={() => {navigate('WalletDetails')}}
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