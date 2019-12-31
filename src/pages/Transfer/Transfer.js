import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {Button, ListItem} from 'react-native-elements';
import {PrimaryText} from 'react-native-normalization-text';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import i18n from '../../helpers/i18n';
import {metrics, vw} from '../../helpers/metric';
import FormRow from '../../components/FormRow';
import _get from 'lodash/get';

export default (props) => {
  const [txConfirmVisible, setTxConfirmVisible] = React.useState(false);
  const {navigate, state} = useNavigation();
  const [transferForm, setTransferForm] = React.useState(_get(props, ['navigation', 'state', 'params', 'transferData']) || {});
  const aaa = useNavigation();
  // const transferData = _get(props, ['navigation', 'state', 'params', 'transferData']) || {};

  console.log(aaa.getParam('a'), 'bbbb');
  const {selectedToken, setSelectedToken} = React.useState();

  const goSelectToken = () => {
    navigate(
      'SelectToken',
      {onSelectToken: token => setSelectedToken(token)}
     );
  };

  const a = useNavigationParam('aaa');
  return (
    <View style={styles.wrapper}>
      <FormRow
        title={i18n.t('transferToken')}
        chevron={{size: 24}}
        bottomDivider
        containerStyle={{}}
        onPress={goSelectToken}
        value={'eadad'}
        editable={false}
      />
      <FormRow
        title={i18n.t('transferAddress')}
        placeholder={i18n.t('transferAddressPlaceholder')}
        bottomDivider
        value={transferForm && transferForm.address || ''}
        onChange={v => setTransferForm({...transferForm, address: v})}
      />
      <FormRow
        title={i18n.t('transferAmount')}
        placeholder={i18n.t('transferAmountPlaceholder')}
        bottomDivider
        value={transferForm && transferForm.amount || ''}
        onChange={v => setTransferForm({...transferForm, amount: v})}
      />
      <ListItem
        title={i18n.t('transferFee')}
        bottomDivider
      />
      <FormRow
        title={i18n.t('transferNote')}
        bottomDivider
        placeholder={i18n.t('transferNotePlaceholder')}
      />

      <Button
        iconRight
        containerStyle={styles.btnContainerStyle}
        title={i18n.t('next')}
        onPress={() => {
          // aaa.setParams({a: '123'});
          // return;
          setTxConfirmVisible(true);
        }}
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