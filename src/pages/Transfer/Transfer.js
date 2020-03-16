import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Keyboard,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Bignumber from 'bignumber.js';
import {Button} from 'react-native-elements';
import {TinyText, scale} from 'react-native-normalization-text';
import _get from 'lodash/get';
import _filter from 'lodash/filter';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import {metrics, vw} from '../../helpers/metric';
import {Toast} from '../../components/Toast';
import {wallet, asset} from '../../redux/actions';
import {chainInfo} from '../../config/';
import i18n from '../../helpers/i18n';
import colors from '../../helpers/colors';
import {isValidNumeric, lowerUnit, upperUnit} from '../../helpers/utils/numbers';
import FormRow from '../../components/FormRow';
import coinsModal from '../../coins';
import {Loading, Overlay} from '../../components/Mask';
import PhoneShapeWrapper from '../../components/PhoneShapeWrapper';
import PageWrapper from '../../components/PageWrapper';
import Icontoken from '../../components/Iconfont/Icontoken';
import Iconjine from '../../components/Iconfont/Iconjine';
import Icondizhi from '../../components/Iconfont/Icondizhi';
import Iconbeizhu from '../../components/Iconfont/Iconbeizhu';
import Iconshouxufeishuai from '../../components/Iconfont/Iconshouxufeishuai';

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

  /**
   * 扫地址，token详情进入带入参数
   */
  const defaultTransferForm = useNavigationParam('transferData') || {};

  // token symbol
  const token = useNavigationParam('token') || {};

  const tokenSymbol = token.symbol;

  defaultTransferForm.token = {
    symbol: tokenSymbol || coinsModal.UTC.symbol, // 默认币种
  };
  defaultTransferForm.isToken = !!token.isToken;

  // 主币种symbol：主币种指向自己，代码指向主币
  defaultTransferForm.attachSymbol = !!token.isToken ? token.attachSymbol : defaultTransferForm.token.symbol;

  // 是否token转账
  const [transferForm, setTransferForm] = React.useState(defaultTransferForm);

  const isToken = transferForm.isToken;

  const mainCoin = coinsModal[transferForm.attachSymbol || transferForm.token.symbol] || {};
  // console.log(mainCoin, 'mainCoin');

  // 选择token
  const goSelectToken = () => {
    navigate('SelectToken', {
      onSelectToken: token => {
        setTransferForm(transferForm => {
          console.log(token, 'tokensss');
          return {
            ...transferForm,
            token,
            isToken: !!token.isToken,
            attachSymbol: token.attachSymbol,
          };
        });
      },
    });
  };

  /**
   * 币种模型属性
   */
  const {
    defaultFee, // 默认手续费
    createTransaction, // 创建交易
    sign, // 签名交易
    sendTransaction, // 发送交易
  } = mainCoin || {};

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

    return (assets && assets[0]) || {};
  });

  /**
   * 主币种资产
   */
  const mainAsset = useSelector(state => {
    const assets = _filter(
      _get(state, ['assets', 'assetsList']) || [],
      o => o.symbol === (currentAsset.attachSymbol || currentAsset.symbol),
    );

    return assets && assets[0];
  });

  // console.log(currentAsset, 'currentAsset')
  /**
   * 点击下一步
   */
  const onPressNext = async () => {
    Keyboard.dismiss();
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
            defaultFee,
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

      console.log(mainAsset.balance, defaultFee, 9999999)

      // 手续费不足
      if (new Bignumber(mainAsset.balance).isLessThan(defaultFee)) {
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
      fee: +defaultFee,
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
    const tx = (await createTransaction(params)) || {};

    if (tx.errorMessage) {
      Toast.show({data: tx.errorMessage});
      return;
    }

    // if (!tx.result) {
    //   Toast.show({
    //     data: i18n.t('createTxFailed'),
    //   });
    //   return;
    // }

    console.log(tx, '构造交易完成-------');

    unsignedTx.current = tx.result;
    requestAnimationFrame(() => {
      Overlay.push(Overlay.contentTypes.TX_CONFIRM, {
        customData: {
          transferForm: {
            ...transferForm,
            fee: upperUnit(defaultFee),
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
  };

  // 签名交易
  const signTx = async pwd => {
    Loading.set({visible: true});

    // 拿私钥
    const privateKey = await dispatch(
      wallet.aesDecrypt({
        data: currentWallet.encryptedPrivateKey,
        password: pwd,
      }),
    );

    console.log(unsignedTx.current, 'unsignedTx.current');
    console.log(privateKey, 'privateKey');

    // 签名交易
    signedTx.current = await sign({data: unsignedTx.current, privateKey, cointype: mainAsset.symbol});

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
    setTransferForm({
      ...defaultTransferForm,
      address: '',
      amount: '',
    });
  };

  /**
   * 单位
   */
  // 金额单位
  const amountUnit = transferForm.token.symbol;
  console.log(transferForm, 'transferForm')

  // 手续费单位
  const feeUnit = transferForm.isToken
    ? transferForm.attachSymbol
    : transferForm.token.symbol;
  console.log(feeUnit, 'feeUnit');

  return (
    <PageWrapper style={styles.wrapper}>
      <PhoneShapeWrapper>
        <ScrollView
          style={styles.contentWrapper}
          keyboardShouldPersistTaps="handled">
          <FormRow
            title={i18n.t('transferToken')}
            leftIcon={<Icontoken size={22} />}
            chevron={{size: 24}}
            // bottomDivider
            onPress={goSelectToken}
            value={amountUnit}
            editable={false}
            containerStyle={styles.formRow}
            inputStyle={{paddingLeft: scale(140)}}
          />
          <FormRow
            title={i18n.t('transferAmount')}
            placeholder={i18n.t('transferAmountPlaceholder')}
            leftIcon={<Iconjine size={22} />}
            value={_get(transferForm, 'amount')}
            onChangeText={onChangeAmount}
            attachment={
              <TinyText style={styles.balance}>
                {i18n.t('balance')}: {currentAsset.balanceFmt} {amountUnit}
              </TinyText>
            }
            containerStyle={styles.formRow}
            inputStyle={{paddingLeft: scale(140)}}
          />
          <FormRow
            title={i18n.t('transferAddress')}
            placeholder={i18n.t('transferAddressPlaceholder')}
            leftIcon={<Icondizhi size={22} />}
            value={_get(transferForm, 'address')}
            onChangeText={onChangeAddress}
            containerStyle={styles.formRow}
            inputStyle={{paddingLeft: scale(140)}}
          />
          <FormRow
            title={i18n.t('transferNote')}
            leftIcon={<Iconbeizhu size={22} />}
            placeholder={i18n.t('transferNotePlaceholder')}
            value={_get(transferForm, 'note')}
            onChangeText={v => setTransferForm({...transferForm, note: v})}
            containerStyle={styles.formRow}
            inputStyle={{paddingLeft: scale(140)}}
          />
          <FormRow
            title={i18n.t('transferFee')}
            leftIcon={<Iconshouxufeishuai size={22} />}
            value={upperUnit(defaultFee) + ' ' + feeUnit}
            editable={false}
            containerStyle={styles.formRow}
            inputStyle={{paddingLeft: scale(140)}}
          />
          <Button
            iconRight
            containerStyle={styles.btnContainerStyle}
            title={i18n.t('next')}
            onPress={onPressNext}
          />
        </ScrollView>
      </PhoneShapeWrapper>
    </PageWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // paddingHorizontal: metrics.spaceS,
    backgroundColor: colors.theme,
  },
  contentWrapper: {
    paddingHorizontal: metrics.spaceS,
  },
  btnContainerStyle: {
    width: '80%',
    marginTop: vw(10),
    alignSelf: 'center',
    marginBottom: metrics.spaceN,
  },
  balance: {
    color: colors.theme,
    position: 'absolute',
    right: '6%',
  },
  formRow: {
    height: scale(56),
  },
});
