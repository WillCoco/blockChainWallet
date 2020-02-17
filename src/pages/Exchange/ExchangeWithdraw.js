/**
 * @author: Xu Ke
 * @date: 2020/2/13 2:40 PM
 * @Description: 闪兑换
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {PrimaryText, SmallText, scale} from 'react-native-normalization-text';
import _get from 'lodash/get';
import _filter from 'lodash/filter';
import Bignumber from 'bignumber.js';
import i18n from '../../helpers/i18n';
import {metrics, vw} from '../../helpers/metric';
import safePage from '../../helpers/safePage';
import colors from '../../helpers/colors';
import {lowerUnit} from '../../helpers/utils/numbers';
import {chainInfo} from '../../config';
import {Toast} from '../../components/Toast';
import {exchangeWithdraw, sendTransaction} from '../../helpers/chain33';
import IconHelp from '../../components/Iconfont/IconquestionRedCopy';
import {Overlay, Loading} from '../../components/Mask';
import {wallet} from '../../redux/actions';

const Withdraw = () => {
  useSelector(state => _get(state, ['appSetting', 'language']));

  const dispatch = useDispatch();

  /**
   * 当前钱包
   */
  const currentWallet = useSelector(
    state => _get(state.wallets, ['currentWallet']) || [],
  );

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

  /**
   * exchange合约资产
   */
  const exchangeUTC = useSelector(state => {
    const asset = _filter(
      _get(state, ['assets', 'assetsList']) || [],
      o => o.symbol === chainInfo.symbol,
    );
    return _get(asset, ['0', 'exchange']) || {};
  });

  // 提现
  const onPressExchange = async () => {
    if (!exchangeUTC.available) {
      return;
    }

    // 手续费不足
    if (new Bignumber(mainAsset.balance).isLessThan(lowerUnit(chainInfo.defaultFee))) {
      Toast.show({data: i18n.t('notEnoughFee')});
      return;
    }

    const r = await exchangeWithdraw({
      amount: +lowerUnit(exchangeUTC.availableFmt),
      fee: +lowerUnit(chainInfo.defaultFee),
    });

    console.log(r, 'exchangeWithdraw');

    if (!r || !r.result) {
      Toast.show({data: i18n.t('withdrawFailed')});
      return;
    }

    // 密码签名
    requestAnimationFrame(() => {
      Overlay.push(Overlay.contentTypes.DIALOG_PASSWORD_VALID, {
        dialog: {
          canCancel: true,
          onValidEnd: (isValid, pwd) => {
            if (isValid) {
              // 签名发送
              signTx(pwd, r.result);
            }
          },
        },
      });
    });
  };

  /**
   * 签名交易
   */
  const signTx = async (pwd, unsignedTx) => {
    Loading.set({visible: true});

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
    const signedTx = await dispatch(
      wallet.signTx({data: unsignedTx, privateKey})
    );

    if (!signedTx) {
      Loading.set({visible: false});

      Toast.show({data: i18n.t('signFailed')});
      return;
    }

    console.log(signedTx, '签名交易');
    sendTx({tx: signedTx});
  };


  /**
   * 发送交易
   */
  const sendTx = async tx => {
    const {result, error} = (await sendTransaction(tx)) || {};

    console.log(result, error, '发送交易');

    Loading.set({visible: false});

    if (error) {
      Toast.show({data: error});
      return;
    }

    // 成功提示
    Toast.show({data: i18n.t('transferSuccess')});
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <View style={styles.row}>
          <PrimaryText color="title">{i18n.t('startContractAccount')}</PrimaryText>
          <TouchableOpacity
            onPress={() => {
              Toast.show({data: i18n.t('contractDescription')});
            }}>
            <IconHelp style={styles.help} />
          </TouchableOpacity>
        </View>
        <PrimaryText style={{color: colors.textTheme}}>
          {exchangeUTC.balanceFmt} {chainInfo.symbol}
        </PrimaryText>
      </View>
      <SmallText>
        {i18n.t('frozenAsset')}: {exchangeUTC.frozenFmt}
      </SmallText>
      <SmallText>
        {i18n.t('availableAsset')}: {exchangeUTC.availableFmt}
      </SmallText>
      <TouchableOpacity
        style={styles.btnContainerStyle}
        onPress={onPressExchange}>
        <SmallText color="white">{i18n.t('withdraw')}</SmallText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    marginHorizontal: metrics.spaceS,
    padding: 8,
    borderRadius: vw(2),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnContainerStyle: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    height: scale(20),
    paddingHorizontal: scale(16),
    backgroundColor: colors.success,
    justifyContent: 'center',
    borderRadius: scale(10),
  },
  help: {
    color: '#000',
    marginLeft: 6,
  },
});

const safeWithdraw = props => safePage(Withdraw, props);

export default safeWithdraw;
