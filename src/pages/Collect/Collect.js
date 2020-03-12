import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Clipboard,
  ImageBackground,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {PrimaryText, H4} from 'react-native-normalization-text';
import {useSelector} from 'react-redux';
import {useNavigationParam} from 'react-navigation-hooks';
import {Icon} from 'react-native-elements';
import _get from 'lodash/get';
import {vh, vw, metrics} from '../../helpers/metric/index';
import colors from '../../helpers/colors/index';
import i18n from '../../helpers/i18n/index';
import chainInfo from '../../config/chainInfo';
import {coins} from '../../config';
import {isValidNumeric} from '../../helpers/utils/numbers';
import {Toast} from '../../components/Toast';
import PhoneShapeWrapper from '../../components/PhoneShapeWrapper';
import Iconshuliang from '../../components/Iconfont/Iconshuliang';
import {scale} from 'react-native-normalization-text';
import images from '../../images';

const Collect = props => {
  const [amount, setAmount] = React.useState('');

  // 当前转账币种，默认主币种
  const currentCoinSymbol =
    _get(useNavigationParam('currentToken'), 'symbol') || coins.UTC.symbol;

  // 如果是token，币种模型使用主币种的
  const attachSymbol = _get(useNavigationParam('currentToken'), 'attachSymbol');

  // 获取当前钱包地址
  const currentWalletAddress = useSelector(state => {
    const finallySymbol = attachSymbol || currentCoinSymbol;
    return (
      _get(state, [
        'wallets',
        'currentWallet',
        'coins',
        finallySymbol,
        'address',
      ]) || ''
    );
  });

  // console.log(currentCoinSymbol, currentWalletAddress, 'currentWalletAddress')
  let qrcodeValue = `${
    chainInfo.chainName
  }:${currentWalletAddress}?amount=${amount}&token=${currentCoinSymbol}`;

  // 复制
  const onPressCopy = () => {
    Clipboard.setString(currentWalletAddress);
    Toast.show({data: i18n.t('copySuccess')});
  };

  const onChangeText = v => {
    if (isValidNumeric(v)) {
      setAmount(v);
    }
  };

  return (
    <View style={styles.wrapper}>
      <PhoneShapeWrapper style={metrics.spaceN}>
        <ImageBackground
          resizeMode="center"
          imageStyle={styles.imageStyle}
          style={styles.qrCodeWrapper}
          source={images.qrCodeBg}>
          <QRCode
            value={`${qrcodeValue}`}
            size={vw(45)}
            logoBackgroundColor="transparent"
          />
        </ImageBackground>
        <View style={styles.amountWrapper}>
          <Iconshuliang size={scale(26)} style={styles.iconStyle} />
          <H4>{i18n.t('amount')}:</H4>
          <TextInput
            placeholder={i18n.t('transferAmountPlaceholder')}
            style={styles.input}
            value={amount}
            onChangeText={onChangeText}
            keyboardType="numeric"
          />
          <PrimaryText>{currentCoinSymbol}</PrimaryText>
        </View>
        <View style={styles.addressWrapper}>
          <PrimaryText style={styles.address}>
            {currentWalletAddress}
          </PrimaryText>
          <TouchableOpacity onPress={onPressCopy}>
            <Icon
              type="material-community"
              name="content-copy"
              color={colors.theme}
              size={vw(4)}
            />
          </TouchableOpacity>
        </View>
      </PhoneShapeWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.theme,
  },
  qrCodeWrapper: {
    backgroundColor: '#fff',
    height: vw(54),
    // minHeight: vh(30),
    // paddingTop: '8%',
    marginTop: vh(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: vw(56),
    height: vw(56),
    marginLeft: '50%',
    // translateX: -vw(26),
    top: -vw(1.5),
    transform: [{translateX: -vw(27)}],
  },
  amountWrapper: {
    marginTop: vh(3),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    paddingBottom: metrics.spaceS,
    paddingHorizontal: metrics.spaceL,
  },
  iconStyle: {
    position: 'relative',
    top: 2,
    marginRight: metrics.spaceS,
  },
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderColor: colors.dividerDark,
    flex: 1,
    maxWidth: vw(40),
    marginHorizontal: metrics.spaceN,
    paddingBottom: 2,
    paddingLeft: 10,
    // textAlign: 'center',
  },
  addressWrapper: {
    flexDirection: 'row',
    marginTop: metrics.spaceS,
    backgroundColor: colors.cardBg,
    paddingVertical: metrics.spaceS,
    paddingHorizontal: metrics.spaceS,
    marginHorizontal: metrics.spaceS,
    alignItems: 'center',
    borderRadius: 8,
  },
  address: {
    flex: 1,
    marginRight: metrics.spaceL,
  },
});

export default Collect;
