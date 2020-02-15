import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
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
    typeof v === 'string' ? `${v.slice(0, 8)}...${v.slice(-8)}` : '';

  // 是否支出
  const isOut = props.direction === 'out';

  const isOk = props.tyname === 'ExecOk';

  /**
   * 交易类型
   */
  const txType = props.txTypes['unlock'];

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
          <PrimaryText color="title">
            {props.leftMainText || shorten(props.txid)}
          </PrimaryText>
          <SmallText>
            {props.day} {props.time}
          </SmallText>
        </View>
      </View>
      <View style={styles.right}>
        <View
          style={StyleSheet.flatten([
            styles.ball,
            {backgroundColor: txType.amountColor},
          ])}
        />
        <PrimaryText
          style={StyleSheet.flatten([
            styles.rightText,
            {color: txType.amountColor},
          ])}>
          {txType.sign} {upperUnit(props.amount)} {props.symbol}
        </PrimaryText>
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
  txTypes: {
    in: {
      amountColor: colors.success,
      sign: '+',
      Icon: IconIn,
      iconBg: colors.iconBg1,
      hasDetail: true,
    },
    out: {
      amountColor: colors.warn,
      sign: '-',
      Icon: IconOut,
      iconBg: colors.iconBg2,
      hasDetail: true,
    },
    exchange: {
      amountColor: colors.success,
      sign: '',
      Icon: IconExchange,
      iconBg: colors.iconBg1,
      hasDetail: true,
    },
    unlock: {
      amountColor: colors.textTheme,
      sign: '*', // todo：看交易数据，是否需要判断
      Icon: IconUnlock,
      iconBg: colors.iconBg1,
      hasDetail: false,
    },
  },
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightText: {
    textAlign: 'center',
  },
  arrowDetail: {
    width: scale(20),
  },
});
