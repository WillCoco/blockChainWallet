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
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {useNavigation} from 'react-navigation-hooks';
import _get from 'lodash/get';
import Bignumber from 'bignumber.js';
import _filter from 'lodash/filter';
import {
  PrimaryText,
  SmallText,
  TinyText,
  H2,
  H3,
  H4,
  scale,
} from 'react-native-normalization-text';
import IconLightning from '../../components/Iconfont/Iconshandian';
import IconArrowRight from '../../components/Iconfont/Iconarrowright';
import {Overlay, Loading} from '../../components/Mask';
import {Toast} from '../../components/Toast';
import AssetCardWrapper from '../../components/AssetCardWrapper';
import i18n from '../../helpers/i18n';
import colors from '../../helpers/colors';
import {vh, vw, metrics} from '../../helpers/metric';
import safePage from '../../helpers/safePage';
import {upperUnit, lowerUnit, isValidNumeric} from '../../helpers/utils/numbers';
import images from '../../images';
import {chainInfo} from '../../config';
import {exchangeMainCoin, sendTransaction} from '../../helpers/chain33';
import {wallet} from '../../redux/actions';

const Exchanger = () => {
  const {navigate} = useNavigation();
  useSelector(state => _get(state, ['appSetting', 'language']));

  const dispatch = useDispatch();

  // 当前钱包
  const currentWallet = useSelector(
    state => _get(state.wallets, ['currentWallet']) || [],
  );

  /**
   * 缓释价格
   */
  const unlock180Price = '15';

  /**
   * 资产列表
   */
  const assetTC = useSelector(state => {
    const asset = _filter(
      _get(state, ['assets', 'assetsList']) || [],
      o => o.symbol === 'TC',
    );
    return _get(asset, '0') || {};
  });

  /**
   * 输入兑换值
   */
  const [exchangeValue, setExchangeValue] = React.useState();
  const onChangeText = v => {
    if (isValidNumeric(v)) {
      setExchangeValue(v);
    }
  };

  /**
   * 当前所选兑换方式
   */
  const exchangeTypes = {
    LOCK: 'LOCK',
    NO_LOCK: 'NO_LOCK',
  };
  const [exchangeType, setExchangeType] = React.useState([exchangeTypes.LOCK]);

  const isLock = exchangeTypes.LOCK === exchangeType;

  /**
   * 汇率
   */
  const rates = useSelector(
    state => _get(state, ['assets', 'exchangeRate']) || {},
  );
  const UTCPrice = isLock ? unlock180Price : rates[chainInfo.symbol];

  console.log(isLock, 'isLockisLockisLockisLock')

  const TC2UTCrate = parseFloat((rates.TC / UTCPrice).toFixed(4));

  /**
   * 修改兑换类型
   */
  const changeExchangeType = () => {
    Overlay.push(Overlay.contentTypes.EXCHANGE_CONFIRM, {
      customData: {
        isLock: !isLock,
        onConfirm: isLock => {
          const type = isLock ? exchangeTypes.LOCK : exchangeTypes.NO_LOCK;
          setExchangeType(type);
        },
      },
    });
  };

  /**
   * 兑换预检
   */
  const preExchange = () => {
    // 最小
    if (
      new Bignumber(lowerUnit(exchangeValue)).isLessThan(
        lowerUnit(chainInfo.minTC2UTCExchangeValue),
      )
    ) {
      Toast.show({
        data: `${i18n.t('exchangeValue2small')} ${chainInfo.minTC2UTCExchangeValue} TC`,
      });
      return false;
    }

    // 余额不足
    if (new Bignumber(assetTC.balance).isLessThan(lowerUnit(exchangeValue))) {
      Toast.show({data: i18n.t('notEnoughAmount')});
      return false;
    }

    // todo： 手续费检测

    return true;
  };

  /**
   * 兑换
   */
  const exchange = async () => {
    // todo: 表单验证
    if (!preExchange()) {
      return;
    }

    Keyboard.dismiss();
    // console.log(
    //   {
    //     amount: +lowerUnit(exchangeValue),
    //     recv: currentWallet.address,
    //     opType: isLock ? 2 : 1
    //   },
    //   1111111
    // );

    // rpc获取兑换未签名交易
    const r = await exchangeMainCoin({
      amount: +lowerUnit(exchangeValue),
      recv: currentWallet.address,
      opType: isLock ? 2 : 1,
    });

    if (!r || !r.result) {
      Toast.show({data: i18n.t('exchangeFailed')});
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

    // 恢复默认表单
    setExchangeValue();
  };

  return (
    <View style={styles.wrapper}>
      <AssetCardWrapper>
        <View style={styles.exchangeCoins}>
          <View style={styles.iconWrapper}>
            <Image
              resizeMode="contain"
              style={styles.coinIcon}
              source={images.TCIcon}
            />
          </View>
          <H3 color="white">TC</H3>
          <IconArrowRight size={scale(26)} style={styles.arrow} />
          <View style={styles.iconWrapper}>
            <Image
              resizeMode="contain"
              style={styles.coinIcon}
              source={images.UTCIcon}
            />
          </View>
          <TouchableOpacity onPress={changeExchangeType}>
            <View style={styles.row}>
              <H3 style={{}} color="white">{chainInfo.symbol}</H3>
              <Icon name="arrow-drop-down" color={colors.textWhite} />
            </View>
            <SmallText style={{color: colors.textGrey2, lineHeight: scale(12)}}>
              {isLock ? i18n.t('unlock180') : i18n.t('notLock')}
            </SmallText>
          </TouchableOpacity>
        </View>
        <View style={styles.exchangeRateWrapper}>
          <PrimaryText color="white">
            {i18n.t('price')} ¥{rates.TC}
          </PrimaryText>
          <PrimaryText color="white">
            {i18n.t('exchangeRate')} {TC2UTCrate}
          </PrimaryText>
          <PrimaryText
            color="white"
            style={{width: '20%', minWidth: scale(64)}}>
            {i18n.t('price')} ¥
            {isLock ? unlock180Price : rates[chainInfo.symbol]}
          </PrimaryText>
        </View>
        <View style={styles.balanceWrapper}>
          <PrimaryText color="white" style={{marginRight: metrics.spaceS}}>
            {i18n.t('balance')} {assetTC.balanceFmt || '0'} TC
          </PrimaryText>
          <TouchableOpacity
            onPress={() => {
              navigate('Collect');
            }}>
            <PrimaryText style={{color: colors.textSuccess}}>
              {i18n.t('recharge')}
            </PrimaryText>
          </TouchableOpacity>
        </View>
        <View style={styles.formWrapper}>
          <TextInput
            value={exchangeValue}
            placeholder={i18n.t('exchangeInputPlaceholder')}
            placeholderTextColor={colors.textGrey3}
            onChangeText={onChangeText}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => {
              const allValue = upperUnit(assetTC.balance, {pretty: false});
              onChangeText(allValue);
            }}>
            <PrimaryText color="white" style={{fontWeight: '500'}}>{i18n.t('all')}</PrimaryText>
          </TouchableOpacity>
          <PrimaryText style={styles.unit}>TC</PrimaryText>
        </View>
        <TinyText style={styles.helpText}>{i18n.t('exchangeRateHelpText')}</TinyText>
      </AssetCardWrapper>
      <Button
        title={i18n.t('exchange')}
        containerStyle={styles.btnContainerStyle}
        buttonStyle={styles.btnStyle}
        icon={<IconLightning size={scale(24)} />}
        onPress={exchange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
  },
  row: {
    flexDirection: 'row',
  },
  contentWrapper: {
    flex: 1,
    paddingTop: vw(8.5),
    paddingBottom: vw(9.6),
    paddingHorizontal: vw(7.2),
    justifyContent: 'space-between',
  },
  exchangeCoins: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exchangeRateWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  arrow: {
    marginHorizontal: vw(10),
  },
  iconWrapper: {
    width: vw(10),
    height: vw(10),
    borderRadius: vw(6),
    backgroundColor: colors.iconBg3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: vw(2),
  },
  coinIcon: {
    width: vw(7),
    height: vw(7),
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceWrapper: {
    flexDirection: 'row',
  },
  formWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  input: {
    color: '#fff',
    width: '60%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.textGrey2,
    paddingBottom: metrics.spaceS,
  },
  unit: {
    position: 'absolute',
    left: '50%',
    bottom: metrics.spaceS - 3,
    color: '#fff',
  },
  btnContainerStyle: {
    alignItems: 'center',
    marginTop: -vh(1.6),
    marginBottom: metrics.spaceS,
  },
  btnStyle: {
    height: vh(8),
    minHeight: scale(50),
    maxHeight: scale(60),
    backgroundColor: colors.success,
    minWidth: '88%',
    borderRadius: vw(2),
  },
  helpText: {
    color: colors.textGrey1,
    bottom: '2.3%',
  },
});

const safeExchanger = props => safePage(Exchanger, props);

export default safeExchanger;
