import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Bignumber from 'bignumber.js';
import {Button, ListItem, Overlay} from 'react-native-elements';
import _get from 'lodash/get';
import {PrimaryText} from 'react-native-normalization-text';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import {metrics, vw, vh} from '../../helpers/metric';
import {createTransaction, sendTransaction} from '../../helpers/chain33';
import {Toast} from '../../components/Toast';
import {wallet} from '../../redux/actions';
import {chainInfo} from '../../config/';
import i18n from '../../helpers/i18n';
import {isValidNumeric, lowerUnit} from '../../helpers/utils/numbers';
import FormRow from '../../components/FormRow';
import TxConfirmOverlay from './TxConfirmOverlay';
import Dialog from '../../components/Dialog';

// console.log(chainInfo.symbol, 'chainInfochainInfochainInfo')
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
  const defaultTransferForm =
    _get(props, ['props', 'navigation', 'state', 'params']) || {};

  // token symbol
  const tokenSymbol = useNavigationParam('tokenSymbol');
  defaultTransferForm.token = {
    symbol: tokenSymbol || chainInfo.symbol, // 默认主币种
  };

  // 是否token转账
  // console.log(chainInfo.symbol, 'chainInfo.symbol')
  // console.log(tokenSymbol, 'tokenSymbol')

  const [transferForm, setTransferForm] = React.useState(defaultTransferForm);

  const isToken = transferForm.token.symbol !== chainInfo.symbol;

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

  /**
   * 输入金额
   */
  const onChangeAmount = v => {
    if (isValidNumeric(v)) {
      return setTransferForm({...transferForm, amount: v});
    }
  };

  /**
   * 输入地址
   */
  const onChangeAddress = v => {
    if (/^[\d\w]*$/.test(v)) {
      return setTransferForm({...transferForm, address: v});
    }
  };

  /**
   * 点击下一步
   */
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
      amount: lowerUnit(_get(transferForm, 'amount')),
      fee: lowerUnit(defaultFee, {needInteger: false}),
      note: _get(transferForm, 'note'),
      isToken: isToken,
      isWithdraw: false,
      tokenSymbol: isToken
        ? _get(transferForm, ['token', 'symbol'])
        : undefined,
      // execName: params.execName,
      execer: isToken ? 'token' : 'coins',
    };

    console.log(params, '构造交易params-------');

    // 构造交易
    const tx = await createTransaction(params);
    if (tx.result) {
      unsignedTx.current = tx.result;
      setTxConfirmVisible(true);
      // signTx();
    }
  };

  // 签名交易
  const signTx = async () => {
    // 验证密码
    const isValidPassword = await dispatch(wallet.validPassword(pwd));
    setPwdDialogVisible(false);
    console.log(isValidPassword, 'isValidPassword');
    if (!isValidPassword) {
      Toast.show({data: i18n.t('passwordValidFailed')});
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

    // console.log(privateKey, 'privateKey');

    // 签名交易
    signedTx.current = await dispatch(
      wallet.signTx({data: unsignedTx.current, privateKey}),
    );

    if (!signedTx.current) {
      Toast.show({data: i18n.t('signFailed')});
      return;
    }

    sendTx({tx: signedTx.current});
  };

  // 发送交易
  const sendTx = async param => {
    const {result, error} = (await sendTransaction(param)) || {};

    console.log(result, '发送交易');

    if (error) {
      Toast.show({data: error});
      return;
    }

    Toast.show({data: i18n.t('transferSuccess')});
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
        value={_get(transferForm, 'address')}
        onChangeText={onChangeAddress}
      />
      <FormRow
        title={i18n.t('transferAmount')}
        placeholder={i18n.t('transferAmountPlaceholder')}
        bottomDivider
        value={_get(transferForm, 'amount')}
        onChangeText={onChangeAmount}
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
        value={_get(transferForm, 'note')}
        onChangeText={v => setTransferForm({...transferForm, note: v})}
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
          confirmPress={() => {
            setPwdDialogVisible(true);
            setTxConfirmVisible(false);
          }}
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