import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Button, ListItem, Overlay} from 'react-native-elements';
import {PrimaryText} from 'react-native-normalization-text';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import {metrics, vw, vh} from '../../helpers/metric';
import {createTransaction, sendTransaction} from '../../helpers/chain33';
import {Toast} from '../../components/Toast';
import {wallet} from '../../redux/actions';
import {chainInfo} from '../../config/';
import i18n from '../../helpers/i18n';
import FormRow from '../../components/FormRow';
import TxConfirmOverlay from './TxConfirmOverlay';
import _get from 'lodash/get';

const defaultFee = 10;

export default props => {
  const [txConfirmVisible, setTxConfirmVisible] = React.useState(false);
  const dispatch = useDispatch();

  // tx构造
  const unsignedTx = React.useRef();
  const {navigate} = useNavigation();

  // 扫地址，token详情进入带入参数
  const defaultTransferForm =
    _get(props, ['navigation', 'state', 'params', 'transferData']) || {};

  // token symbol
  const tokenSymbol = useNavigationParam('tokenSymbol');
  defaultTransferForm.token = {
    symbol: tokenSymbol || chainInfo.symbol, // 默认主币种
  };

  // 是否token转账
  const isToken = tokenSymbol === chainInfo.symbol;


  const [transferForm, setTransferForm] = React.useState(defaultTransferForm);

  // 选择token
  const goSelectToken = () => {
    navigate('SelectToken', {
      onSelectToken: token =>
        setTransferForm(transferForm => {
          return {
            ...transferForm,
            token,
          };
        }),
    });
  };

  const onPressNext = () => {
    const safeTransferForm = transferForm || {};
    if (!safeTransferForm.address) {
      Toast.show({data: i18n.t('transferAddressInvalid')});
      return;
    }

    if (!safeTransferForm.amount) {
      Toast.show({data: i18n.t('transferInvalidAmount')});
      return;
    }

    // if (!safeTransferForm.token) {
    //   Toast.show({data: i18n.t('transferInvalidAmount')});
    //   return;
    // }

    createTx();
  };

  // 构造交易
  const createTx = async () => {
    const params = {
      to: _get(transferForm, 'address'),
      amount: +_get(transferForm, 'amount'),
      fee: +defaultFee,
      note: _get(transferForm, 'note'),
      isToken: isToken,
      isWithdraw: false,
      tokenSymbol: isToken ? tokenSymbol : undefined,
      // execName: params.execName,
      execer: isToken ? 'token' : 'coins',
    };

    // 构造交易
    const tx = await createTransaction(params);
    if (tx.result) {
      unsignedTx.current = tx.result;
      setTxConfirmVisible(true);

      signTx();
    }
  };

  // 签名交易
  const signTx = async password => {
    // 验证密码
    const isValidPassword = await dispatch(wallet.validPassword('11'||password));
    console.log(isValidPassword, 'isValidPassword');
    if (!isValidPassword) {
      Toast.show(i18n.t('密码验证失败'));
      return;
    }
    sendTransaction({tx: unsignedTx.current});
  };

  // 发送交易
  const sendTx = () => {
    sendTransaction({tx: unsignedTx.current});
  };

  const nextPress = () => {

  };

  return (
    <View style={styles.wrapper}>
      <FormRow
        title={i18n.t('transferToken')}
        chevron={{size: 24}}
        bottomDivider
        containerStyle={{}}
        onPress={goSelectToken}
        value={_get(transferForm, ['token', 'symbol']) || chainInfo.symbol}
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
      <FormRow
        title={i18n.t('transferFee')}
        value={defaultFee + ' ' + chainInfo.symbol}
        bottomDivider
        editable={false}
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
        onPress={onPressNext}
      />
      <Overlay
        isVisible={txConfirmVisible}
        overlayStyle={styles.overlayStyle}
        onBackdropPress={() => setTxConfirmVisible(false)}
        animationType="slide">
        <TxConfirmOverlay closePress={() => setTxConfirmVisible(false)} />
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