import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import _get from 'lodash/get';
import {PrimaryText, SmallText, scale} from 'react-native-normalization-text';
import colors from '../../helpers/colors/index';
import {metrics, vw} from '../../helpers/metric/index';
import {upperUnit} from '../../helpers/utils/numbers';
import safePage from '../../helpers/safePage';
import IconIn from '../../components/Iconfont/Iconin';
import IconOut from '../../components/Iconfont/Iconout';
import IconExchange from '../../components/Iconfont/Iconexchange';
import IconUnlock from '../../components/Iconfont/Iconunlock';
import IconArrowDetail from '../../components/Iconfont/Iconarrowdetail';

const TxRow = props => {
  // 缩短txId
  const shorten = v =>
    typeof v === 'string' ? `${v.slice(0, 6)}...${v.slice(-6)}` : '';

  // 是否支出
  const isOut = props.direction === 'out';

  const isOk = props.tyname === 'ExecOk';

  /**
   * 交易类型
   */
  const txTypes = {
    in: {
      leftMainText: shorten(props.txid),
      RTText: props.amount,
      RTTextColor: colors.textSuccess,
      RTSign: '+',
      Icon: IconIn,
      iconBg: colors.iconBg1,
      hasDetail: true,
    },
    out: {
      leftMainText: shorten(props.txid),
      RTText: props.amount,
      RTTextColor: colors.textWarn,
      RTSign: '-',
      Icon: IconOut,
      iconBg: colors.iconBg2,
      hasDetail: true,
    },
    exchange: {
      leftMainText: props.leftMainText || shorten(props.txid),
      RTText: props.amount,
      RTTextColor: colors.textWarn,
      RTSign: '-',
      Icon: IconExchange,
      iconBg: colors.iconBg1,
      hasDetail: true,
    },
    unlock: {
      leftMainText: props.leftMainText || shorten(props.txid),
      RTText: props.amount,
      RTTextColor: colors.textTheme,
      RTSign: '*', // todo：看交易数据，是否需要判断
      Icon: IconUnlock,
      iconBg: colors.iconBg1,
      hasDetail: false,
    },
    // 闪兑页面的兑换记录
    exchangeType1: {
      leftMainText: props.leftMainText,
      RTText: props.amount,
      RTTextColor: colors.textWarn,
      RTSign: '-',
      RBText: props.reward,
      RBTextColor: colors.textSuccess,
      RBSign: '+',
      Icon: IconExchange,
      iconBg: colors.iconBg1,
      hasDetail: false,
    },
    unlockType1: {
      leftMainText: props.leftMainText,
      RTText: props.amount,
      RTTextColor: colors.textTheme,
      RTSign: '',
      Icon: IconExchange,
      iconBg: colors.iconBg1,
      hasDetail: false,
    },
  };

  // 判断交易类型
  let type;
  const txAction = _get(props, ['action']);

  // console.log(txAction, 'txAction')

  if (txAction === 'ExchangeActiveOp') {
    // 释放
    type = 'unlock';
  } else if (txAction === 'ExchangeOp') {
    // 兑换
    type = 'exchange';
  } else if (txAction === 'transfer') {
    // 转账
    type = _get(props, ['direction']) === 'out' ? 'out' : 'in';
  }
  // console.log(type, 'type')

  const txType =
    txTypes[props.txType] || // props指定
    txTypes[type] || // 根据action字段判断
    txTypes['in']; // 兜底

  // console.log(txType, 'txType')

  return (
    <TouchableOpacity
      onPress={txType.hasDetail ? props.onPress : undefined}
      style={StyleSheet.flatten([styles.wrapper, props.style])}>
      <View style={styles.left}>
        <View
          style={StyleSheet.flatten([
            styles.iconsWrapper,
            {backgroundColor: txType.iconBg},
          ])}>
          <txType.Icon size={scale(24)} style={styles.icon} />
        </View>
        <View>
          <PrimaryText color="title">{txType.leftMainText}</PrimaryText>
          <SmallText>
            {props.day} {props.time}
          </SmallText>
        </View>
      </View>
      <View style={styles.right}>
        <View
          style={StyleSheet.flatten([
            styles.ball,
            {backgroundColor: txType.RTTextColor},
          ])}
        />
        <View style={{}}>
          <PrimaryText
            numberOfLines={1}
            ellipsizeMode="tail"
            style={StyleSheet.flatten([
              styles.rightText,
              {color: txType.RTTextColor},
            ])}>
            {txType.RTSign} {upperUnit(txType.RTText)} {props.symbol}
          </PrimaryText>
          {props.RBText && (
            <PrimaryText
              style={StyleSheet.flatten([
                styles.rightText,
                {color: txType.RBTextColor},
              ])}>
              {txType.RBSign} {upperUnit(txType.RBText)} {props.symbol}
            </PrimaryText>
          )}
        </View>
        <View style={styles.arrowDetail}>
          {txType.hasDetail ? <IconArrowDetail size={scale(24)} /> : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const safeTxRow = props => safePage(TxRow, props);

safeTxRow.defaultProps = {
  title: 'name',
  amount: 'amount',
  day: 'YYYY.MM.DD',
  time: 'hh:mm',
  leftMainText: null,
  onPress: () => undefined,
};

export default safeTxRow;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: vw(2),
    paddingVertical: vw(3.2),
    backgroundColor: '#fff',
    marginTop: vw(2),
    marginHorizontal: metrics.spaceS,
    overflow: 'hidden',
  },
  iconsWrapper: {
    width: vw(10),
    height: vw(10),
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: vw(4),
    borderRadius: scale(6),
  },
  icon: {},
  ball: {
    height: scale(6),
    width: scale(6),
    borderRadius: scale(3),
    marginRight: metrics.spaceS,
  },
  left: {
    flexDirection: 'row',
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },
  rightText: {
    textAlign: 'center',
  },
  arrowDetail: {
    width: scale(20),
  },
});
