import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';
import {Button, ListItem, Overlay, Icon} from 'react-native-elements';
import {PrimaryText} from 'react-native-normalization-text';
import _get from 'lodash/get';
import i18n from '../../../helpers/i18n';
import {metrics, vw, vh} from '../../../helpers/metric';
import colors from '../../../helpers/colors';
import FormRow from '../../../components/FormRow';
import {chainInfo} from '../../../config/';
import safePage from '../../../helpers/safePage';

const Row = props => {
  return (
    <View style={styles.rowWrapper}>
      <PrimaryText style={styles.rowLeft}>
        {props.title ? props.title : ''}
      </PrimaryText>
      <PrimaryText color="title" style={styles.rowRight}>
        {props.text ? props.text : ''}
      </PrimaryText>
    </View>
  );
};

const TxConfirm = props => {
  const transferForm = _get(props, 'transferForm') || {};

  return (
    <View style={styles.wrapper}>
      <View style={styles.contentWrapper}>
        <View style={styles.titleContainer}>
          <Icon
            name="close"
            style={{width: 20}}
            onPress={() => {
              props.remove();
              props.closePress && props.closePress();
            }}
          />
          <PrimaryText color="title" style={{textAlign: 'center', flex: 1}}>
            {i18n.t('orderDetail')}
          </PrimaryText>
          <View style={{width: 20}} />
        </View>
        <ScrollView style={styles.scrollWrapper}>
          <Row
            title={i18n.t('transferToken')}
            text={_get(transferForm, ['token', 'symbol']) || chainInfo.symbol}
          />
          <Row title={i18n.t('transferAddress')} text={transferForm.address} />
          <Row title={i18n.t('transferAmount')} text={transferForm.amount} />
          <Row
            title={i18n.t('transferFee')}
            text={transferForm.fee + ' ' + chainInfo.symbol}
          />
          {transferForm.note ? (
            <Row
              title={i18n.t('transferNote')}
              text={transferForm.note || ''}
            />
          ) : null}
        </ScrollView>
        <Button
          iconRight
          containerStyle={styles.btnContainerStyle}
          title={i18n.t('confirm')}
          onPress={props.confirmPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  rowWrapper: {
    flexDirection: 'row',
    marginVertical: metrics.spaceS,
  },
  rowLeft: {
    flex: -1,
    width: 100,
    marginLeft: vw(4),
  },
  rowRight: {
    flex: 1,
  },
  contentWrapper: {
    padding: metrics.spaceS,
    backgroundColor: '#fff',
    maxHeight: vh(70),
  },
  scrollWrapper: {
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
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderColor: colors.divider,
    paddingBottom: metrics.spaceS,
  },
});

const SafeTxConfirm = props => safePage(TxConfirm, props);

SafeTxConfirm.defaultProps = {
  confirmPress: () => undefined,
};

export default SafeTxConfirm;
