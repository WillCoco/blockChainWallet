import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {Button, ListItem, Overlay, Icon} from 'react-native-elements';
import {PrimaryText} from 'react-native-normalization-text';
import _get from 'lodash/get';
import i18n from '../../helpers/i18n';
import {metrics, vw} from '../../helpers/metric';
import FormRow from '../../components/FormRow';
import {chainInfo} from '../../config/';

const TxConfirmOverlay = props => {
  const {transferForm} = props;

  return (
    <View style={styles.wrapper}>
      <View style={styles.titleContainer}>
        <Icon name="close" onPress={props.closePress} style={{width: 20}}/>
        <PrimaryText style={{textAlign: 'center', flex: 1}}>{i18n.t('orderDetail')}</PrimaryText>
        <View style={{width: 20}}></View>
      </View>
      <FormRow
        title={i18n.t('transferToken')}
        containerStyle={{}}
        value={_get(transferForm, ['token', 'symbol']) || chainInfo.symbol}
        editable={false}
      />
      <FormRow
        title={i18n.t('transferAddress')}
        value={transferForm && transferForm.address || ''}
        editable={false}
      />
      <FormRow
        title={i18n.t('transferAmount')}
        value={transferForm && transferForm.amount || ''}
        editable={false}
      />
      <FormRow
        title={i18n.t('transferFee')}
        value={props.defaultFee + ' ' + chainInfo.symbol}
        editable={false}
      />
      <FormRow
        title={i18n.t('transferNote')}
        value={transferForm && transferForm.note || ''}
        editable={false}
      />
      <Button
        iconRight
        containerStyle={styles.btnContainerStyle}
        title={i18n.t('confirm')}
        onPress={props.confirmPress}
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