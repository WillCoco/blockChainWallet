import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {Button, ListItem, Overlay} from 'react-native-elements';
import {PrimaryText} from 'react-native-normalization-text';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import i18n from '../../helpers/i18n';
import {metrics, vw, vh} from '../../helpers/metric';
import FormRow from '../../components/FormRow';
import TxConfirmOverlay from './TxConfirmOverlay';
import _get from 'lodash/get';

export default (props) => {
  const [txConfirmVisible, setTxConfirmVisible] = React.useState(false);
  const {navigate, state} = useNavigation();
  const [transferForm, setTransferForm] = React.useState(_get(props, ['props', 'navigation', 'state', 'params']) || {});
  const aaa = useNavigation();

  console.log(aaa.getParam('a'), 'bbbb');
  const {selectedToken, setSelectedToken} = React.useState();
  console.log(aaa)

  const goSelectToken = () => {
    navigate(
      'SelectToken',
      {onSelectToken: token => setSelectedToken(token)}
     );
  };

  const nextPress = () => {

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
      <Overlay 
        isVisible={txConfirmVisible} 
        overlayStyle={styles.overlayStyle}
        onBackdropPress={() => setTxConfirmVisible(false)}
        animationType='slide'
      >
        <TxConfirmOverlay 
          closePress={() => setTxConfirmVisible(false)}
        />
      </Overlay>
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
  overlayStyle: {
    height: 500,
    width: '100%',
    top: vh(100) - 550,
  },
});