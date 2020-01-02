import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {Button, ListItem, Overlay, Icon} from 'react-native-elements';
import {PrimaryText} from 'react-native-normalization-text';
import i18n from '../../helpers/i18n';
import {metrics, vw} from '../../helpers/metric';

const TxConfirmOverlay = props => {
  // const [txConfirmVisible, setTxConfirmVisible] = React.useState(false);
  return (
    <View style={styles.wrapper}>
      <View style={styles.titleContainer}>
        <Icon name="close" onPress={props.closePress} style={{width: 20}}/>
        <PrimaryText style={{textAlign: 'center', flex: 1}}>{i18n.t('orderDetail')}</PrimaryText>
        <View style={{width: 20}}></View>
      </View>
      <ListItem
        // Component={() => <PrimaryText style={styles.titleStyles}>{i18n.t('orderDetail')}</PrimaryText>}
        title={i18n.t('transferToken')}
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
        title={i18n.t('confirm')}
        onPress={() => setTxConfirmVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: metrics.spaceS,
    // height: 20,
  },
  btnContainerStyle: {
    width: '80%',
    marginTop: vw(10),
    alignSelf: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'space-between',
  }
});

TxConfirmOverlay.defaultProps = {
  closePress: void 0,
};

export default TxConfirmOverlay;