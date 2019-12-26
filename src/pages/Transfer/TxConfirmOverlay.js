import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {Button, ListItem} from 'react-native-elements';
import {PrimaryText} from 'react-native-normalization-text';
import i18n from '../../helpers/i18n';
import {metrics, vw} from '../../helpers/metric';

export default () => {
  const [txConfirmVisible, setTxConfirmVisible] = React.useState(false);
  return (
    <View style={styles.wrapper}>
      <ListItem
        Component={() => <PrimaryText>123123</PrimaryText>}
        title={i18n.t('transferToken')}
        chevron={{size: 24}}
        bottomDivider
      />
      <ListItem
        title={i18n.t('transferAddress')}
        bottomDivider
      />
      <ListItem
        title={i18n.t('transferAmount')}
        bottomDivider
      />
      <ListItem
        title={i18n.t('transferFee')}
        bottomDivider
      />
      <ListItem
        title={i18n.t('transferNote')}
        bottomDivider
      />

      <Button
        iconRight
        containerStyle={styles.btnContainerStyle}
        title={i18n.t('next')}
        onPress={() => setTxConfirmVisible(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: metrics.spaceS,
  },
  btnContainerStyle: {
    width: '80%',
    marginTop: vw(10),
    alignSelf: 'center',
  },
});