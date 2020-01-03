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
import Dialog from '../../components/Dialog';
import _get from 'lodash/get';

const defaultFee = 0.001;

export default props => {
  // 当前钱包
  const currentWallet = useSelector(
    state => _get(state, ['wallets', 'currentWallet']) || {},
  );

  // 签名后交易
  const signedTx = React.useRef();

  const [txConfirmVisible, setTxConfirmVisible] = React.useState(false);
  const [pwdDialogVisible, setPwdDialogVisible] = React.useState(false);
  const [pwd, setPwd] = React.useState('');
  const dispatch = useDispatch();

  // tx构造
  const unsignedTx = React.useRef();
  const {navigate} = useNavigation();

  // 扫地址，token详情进入带入参数
  const defaultTransferForm = _get(props, ['props', 'navigation', 'state', 'params']) || {};

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
    if (
      !safeTransferForm.address ||
      safeTransferForm.address === currentWallet.address // 相同地址
    ) {
      Toast.show({data: i18n.t('transferAddressInvalid')});
      return;
    }

    if (!safeTransferForm.amount) {
      Toast.show({data: i18n.t('transferInvalidAmount')});
      return;
    }

    createTx();
  };

  // 构造交易
  const createTx = async () => {
    const params = {
      to: _get(transferForm, 'address'),
      amount: +_get(transferForm, 'amount') * 100000000,
      fee: +defaultFee * 100000000,
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
  const signTx = async () => {
    // 验证密码
    const isValidPassword = await dispatch(wallet.validPassword(pwd));
    setPwdDialogVisible(false);
    console.log(isValidPassword, 'isValidPassword');
    if (!isValidPassword) {
      Toast.show({data: '密码验证失败'});
      return;
    }
    sendTransaction({tx: unsignedTx.current});
  
    // 拿私钥
    const privateKey = await dispatch(
      wallet.aesDecrypt({
        data: currentWallet.encryptedPrivateKey,
        // password: '11',
        password: pwd,
      }),
    );

    console.log(privateKey, 'privateKey');

    // 签名交易
    signedTx.current = await dispatch(
      wallet.signTx({data: unsignedTx.current, privateKey}),
    );

    if (!signedTx.current) {
      Toast.show(i18n.t('签名失败'));
      return;
    }

    sendTx({tx: signedTx.current});
  };

  // 发送交易
  const sendTx = async param => {
    const result = await sendTransaction(param);

    console.log(result, '发送交易');
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
        value={transferForm && transferForm.note || ''}
        onChange={v => setTransferForm({...transferForm, note: v})}
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
        <TxConfirmOverlay 
          closePress={() => setTxConfirmVisible(false)} 
          transferForm={transferForm}
          defaultFee={defaultFee}
          confirmPress={() => {setPwdDialogVisible(true); setTxConfirmVisible(false)}}
        />
      </Overlay>
      <Dialog
        showInput
        description={i18n.t('passwordValidDesc')}
        visible={pwdDialogVisible}
        onChangeText={setPwd}
        onCancelPress={() => setPwdDialogVisible(false)}
        onOKPress={signTx}
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
  overlayStyle: {
    height: 500,
    width: '100%',
    top: vh(100) - 550,
  },
});