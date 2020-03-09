import React from 'react';
import {StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import {useNavigation} from 'react-navigation-hooks';
import colors from '../../helpers/colors';

export default props => {
  const {navigate} = useNavigation();

  return (
    <ListItem
      style={StyleSheet.flatten([styles.walletCard, props.style])}
      containerStyle={styles.walletCardBg}
      title={props.walletName || ''}
      subtitle={props.walletAddress || ''}
      onPress={() => {
        navigate('WalletDetails', props.wallet);
      }}
      titleStyle={{marginBottom: 6, color: colors.textTitle, fontWeight: '500'}}
      titleProps={{ellipsizeMode: 'middle', numberOfLines: 1}}
      subtitleProps={{ellipsizeMode: 'middle', numberOfLines: 1}}
      subtitleStyle={{color: colors.textSecondary}}
    />
  );
};

const styles = StyleSheet.create({
  walletCard: {
    marginBottom: 15,
    overflow: 'hidden',
    borderRadius: 16,
  },
  walletCardBg: {
    backgroundColor: colors.cardBg,
  },
});
