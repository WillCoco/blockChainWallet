/**
 * @author: Xu Ke
 * @date: 2020/2/13 2:40 PM
 * @Description: 闪兑换
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {useNavigation} from 'react-navigation-hooks';
import _get from 'lodash/get';
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
import {Overlay} from '../../components/Mask';
import {Toast} from '../../components/Toast';
import i18n from '../../helpers/i18n';
import colors from '../../helpers/colors';
import {vh, vw, metrics} from '../../helpers/metric';
import safePage from '../../helpers/safePage';
import {upperUnit, isValidNumeric} from '../../helpers/utils/numbers';
import images from '../../images';
import {chainInfo} from '../../config';

const Exchanger = () => {
  const {navigate} = useNavigation();
  useSelector(state => _get(state, ['appSetting', 'language']));

  // 当前钱包
  const currentWallet = useSelector(
    state => _get(state.wallets, ['currentWallet']) || [],
  );

  /**
   * 资产列表
   */
  const assetTC = useSelector(state => {
    const asset = _filter(
      _get(state, ['assets', 'assetsList']) || [],
      o => o.symbol === 'TC',
    );
    return _get(asset, '0');
  });

  /**
   * 汇率
   */
  const rates = useSelector(
    state => _get(state, ['assets', 'exchangeRate']) || {},
  );
  const TC2UTCrate = parseFloat(
    (rates.TC / rates[chainInfo.symbol]).toFixed(4),
  );

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
   * 缓释价格
   */
  const unlock180Price = '15';

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
   * 兑换
   */
  const exchange = () => {
    if (true) {
      Toast.show({
        data: i18n.t('exchangeSucceed'),
      });
      return;
    }

    Toast.show({
      data: i18n.t('exchangeFailed'),
    });
  };

  return (
    <ImageBackground source={images.netBg} style={styles.headerWrapper}>
      <ImageBackground
        resizeMode="contain"
        source={images.assetDetailCard}
        imageStyle={styles.cardImg}
        style={styles.cardWrapper}>
        <View style={styles.contentWrapper}>
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
              <SmallText
                style={{color: colors.textGrey2, lineHeight: scale(12)}}>
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
              {i18n.t('balance')} {assetTC.balanceFmt} TC
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
        </View>
      </ImageBackground>
      <Button
        title={i18n.t('exchange')}
        containerStyle={styles.btnContainerStyle}
        buttonStyle={styles.btnStyle}
        icon={<IconLightning size={scale(24)} />}
        onPress={exchange}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: colors.theme,
    paddingTop: vh(12),
    // height: '58%',
    // justifyContent: 'flex-end',
  },
  cardWrapper: {
    height: vw(62),
  },
  cardImg: {
    width: '100%',
    height: '100%',
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
    // height: scale(44),
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
    alignItems: 'center',
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
    marginTop: -vh(0.8),
    marginBottom: metrics.spaceN,
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
    marginTop: '-2.5%',
  },
});

const safeExchanger = props => safePage(Exchanger, props);

export default safeExchanger;
