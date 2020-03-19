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
import IconArrowDetail from '../../components/Iconfont/Iconarrowdetail';

// 缩短txId
const shorten = v =>
  typeof v === 'string' ? `${v.slice(0, 6)}...${v.slice(-6)}` : '';

const TxRow = props => {
  const txType = props.dataAdapter(props.data);

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
          <PrimaryText color="title">{txType.LTText}</PrimaryText>
          <SmallText>{txType.LBText}</SmallText>
        </View>
      </View>
      <View style={styles.right}>
        <View
          style={StyleSheet.flatten([
            styles.ball,
            {backgroundColor: txType.RTTextColor},
          ])}
        />
        <View style={{alignItems: 'flex-end'}}>
          <View style={{flexDirection: 'row'}}>
            <PrimaryText style={{width: 8, color: txType.RTTextColor, marginRight: 4, textAlign: 'center'}}>
              {txType.RTSign}
            </PrimaryText>
            <PrimaryText
              numberOfLines={1}
              ellipsizeMode="tail"
              style={StyleSheet.flatten([
                styles.rightText,
                {color: txType.RTTextColor},
              ])}>
              {upperUnit(txType.RTText)} {txType.RTSymbol || props.symbol}
            </PrimaryText>
          </View>
          {txType.RBText && (
            <View style={{flexDirection: 'row'}}>
              <PrimaryText style={{width: 8, color: txType.RBTextColor, marginRight: 4, textAlign: 'center'}}>
                {txType.RBSign}
              </PrimaryText>
              <PrimaryText
                style={StyleSheet.flatten([
                  styles.rightText,
                  {color: txType.RBTextColor},
                ])}>
                {upperUnit(txType.RBText)} {txType.RBSymbol || props.symbol}
              </PrimaryText>
            </View>
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

/**
 * 预设适配器
 */
safePage.dataAdapter = data => ({
  LTText: shorten(data.txid),
  LBText: `${data.day} ${data.time}`,
  RTText: data.amount,
  RTTextColor: colors.textSuccess,
  RTSign: data.direction === 'out' ? '-' : '+',
  RTSymbol: data.attachSymbol || data.symbol,
  Icon: data.direction === 'out' ? IconOut : IconIn,
  iconBg: colors.iconBg1,
  hasDetail: true,
});

safeTxRow.defaultProps = {
  data: {
    txid: 'haksjdhkajsdhcbajsbcjasbasjkdhkjasasdasdasf',
    amount: 'amount',
    day: 'YYYY.MM.DD',
    time: 'hh:mm',
    symbol: 'BTC',
  },
  dataAdapter: safePage.dataAdapter,
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
  },
  rightText: {
    textAlign: 'center',
  },
  arrowDetail: {
    width: scale(20),
  },
});
