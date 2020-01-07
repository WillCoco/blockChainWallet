import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import {useNavigation} from 'react-navigation-hooks';

export default (props) => {
  const {navigate} = useNavigation();

  return (
    <ListItem
      style={styles.walletCard}
      title={props.walletName || ''}
      subtitle={props.walletAddress || ''}
      onPress={() => {navigate('WalletDetails', props.wallet)}}
      titleProps={{ellipsizeMode: 'middle', numberOfLines: 1}}
      subtitleProps={{ellipsizeMode: 'middle', numberOfLines: 1}}
      chevron
    />
  );
};

const styles = StyleSheet.create({
  walletCard: {
    marginBottom: 15
  },
});