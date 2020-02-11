import React from 'react';
import {
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Bignumber from 'bignumber.js';
import {Button} from 'react-native-elements';
import {TinyText} from 'react-native-normalization-text';
import _get from 'lodash/get';
import _filter from 'lodash/filter';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import {metrics, vw} from '../../helpers/metric';
import {createTransaction, sendTransaction} from '../../helpers/chain33';
import {Toast} from '../../components/Toast';
import {wallet, asset} from '../../redux/actions';
import {chainInfo} from '../../config/';
import i18n from '../../helpers/i18n';
import colors from '../../helpers/colors';
import {isValidNumeric, lowerUnit} from '../../helpers/utils/numbers';
import FormRow from '../../components/FormRow';
import {Loading, Overlay} from '../../components/Mask';
import NavBar from '../../components/NavBar';

// console.log(chainInfo.symbol, 'chainInfochainInfochainInfo')
const defaultFee = 0.001;

export default props => {
  // 当前钱包
  const currentWallet = useSelector(
    state => _get(state, ['wallets', 'currentWallet']) || {},
  );

  // 签名后交易
  const signedTx = React.useRef();

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

  const isToken = _get(transferForm, ['token', 'symbol']) !== chainInfo.symbol;

  // 选择token
  const goSelectToken = () => {
    navigate('SelectToken', {
      onSelectToken: token => {
        setTransferForm(transferForm => {
          console.log(token, 'tokensss')
          return {
            ...transferForm,
            token,
          };
        });
      },
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
   * 获取当前资产余额
   */
  const currentAsset = useSelector(state => {
    const assets = _filter(
      _get(state, ['assets', 'assetsList']) || [],
      o => o.symbol === _get(transferForm, ['token', 'symbol']),
    );

    return assets && assets[0];
  });

  /**
   * 主币种资产
   */
  const mainAsset = useSelector(state => {
    const assets = _filter(
      _get(state, ['assets', 'assetsList']) || [],
      o => o.symbol === chainInfo.symbol,
    );

    return assets && assets[0];
  });

  // console.log(currentAsset, 'currentAsset')
  /**
   * 点击下一步
   */
  const onPressNext = async () => {
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

    // 检查余额
    Loading.set({visible: true});
    // 更新一次余额
    await dispatch(asset.getAssetByAddress());

    Loading.set({visible: false});

    // 检查余额
    if (currentAsset.symbol === chainInfo.symbol) {
      // 转主币种
      if (
        new Bignumber(currentAsset.balance).isLessThan(
          new Bignumber(lowerUnit(safeTransferForm.amount)).plus(
            lowerUnit(defaultFee),
          ),
        )
      ) {
        Toast.show({data: i18n.t('notEnoughAmount')});
        return;
      }
    } else {
      // 余额不足
      if (
        new Bignumber(currentAsset.balance).isLessThan(
          lowerUnit(safeTransferForm.amount),
        )
      ) {
        Toast.show({data: i18n.t('notEnoughAmount')});
        return;
      }

      // 手续费不足
      if (new Bignumber(mainAsset.balance).isLessThan(lowerUnit(defaultFee))) {
        Toast.show({data: i18n.t('notEnoughFee')});
        return;
      }
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

    console.log(tx, '构造交易完成-------');
    if (tx.result) {
      unsignedTx.current = tx.result;
      requestAnimationFrame(() => {
        Overlay.push(Overlay.contentTypes.TX_CONFIRM, {
          customData: {
            transferForm: {
              ...transferForm,
              fee: defaultFee,
            },
            confirmPress: () => {
              Overlay.remove();
              Overlay.push(Overlay.contentTypes.DIALOG_PASSWORD_VALID, {
                dialog: {
                  canCancel: true,
                  onValidEnd: (isValid, pwd) => {
                    if (isValid) {
                      // 签名发送
                      signTx(pwd);
                    }
                  },
                },
              });
            },
          },
        });
      });
    }
  };

  // 签名交易
  const signTx = async (pwd) => {
    Loading.set({visible: true});

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
      Loading.set({visible: false});

      Toast.show({data: i18n.t('signFailed')});
      return;
    }

    console.log(signedTx.current, 'signedTx.currentsignedTx.current')
    sendTx({tx: signedTx.current});
  };

  // 发送交易
  const sendTx = async param => {
    const {result, error} = (await sendTransaction(param)) || {};

    console.log(result, '发送交易');

    Loading.set({visible: false});

    if (error) {
      Toast.show({data: error});
      return;
    }

    // 成功提示
    Toast.show({data: i18n.t('transferSuccess')});

    // 恢复默认表单
    setTransferForm(defaultTransferForm);
  };

  /**
   * 单位
   */
  const unitSymbol =
    _get(transferForm, ['token', 'symbol']) || chainInfo.symbol;

  return (
    <ScrollView style={styles.wrapper} keyboardShouldPersistTaps="handled">
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <NavBar
        lightTheme
        title={i18n.t('transfer')}
        safeViewStyle={{
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        titleStyle={{
          color: colors.textTitle,
        }}
      />
      <FormRow
        title={i18n.t('transferToken')}
        chevron={{size: 24}}
        bottomDivider
        containerStyle={{}}
        onPress={goSelectToken}
        value={unitSymbol}
        editable={false}
      />
      <FormRow
        title={i18n.t('transferAmount')}
        placeholder={i18n.t('transferAmountPlaceholder')}
        bottomDivider
        value={_get(transferForm, 'amount')}
        onChangeText={onChangeAmount}
        attachment={
          <TinyText style={styles.balance}>
            {i18n.t('balance')}: {currentAsset.balanceFmt} {unitSymbol}
          </TinyText>
        }
      />
      <FormRow
        title={i18n.t('transferAddress')}
        placeholder={i18n.t('transferAddressPlaceholder')}
        bottomDivider
        value={_get(transferForm, 'address')}
        onChangeText={onChangeAddress}
      />
      <FormRow
        title={i18n.t('transferNote')}
        bottomDivider
        placeholder={i18n.t('transferNotePlaceholder')}
        value={_get(transferForm, 'note')}
        onChangeText={v => setTransferForm({...transferForm, note: v})}
      />
      <FormRow
        title={i18n.t('transferFee')}
        value={defaultFee + ' ' + chainInfo.symbol}
        bottomDivider
        editable={false}
      />
      <Button
        iconRight
        containerStyle={styles.btnContainerStyle}
        title={i18n.t('next')}
        onPress={onPressNext}
      />
    </ScrollView>
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
  balance: {
    color: colors.theme,
    position: 'absolute',
    right: '6%',
  }
});
