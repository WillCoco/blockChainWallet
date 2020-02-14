import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {PrimaryText, SmallText} from 'react-native-normalization-text';
import {Icon} from 'react-native-elements';
import colors from '../../helpers/colors/index';
import {metrics, vw} from '../../helpers/metric/index';
import {upperUnit} from '../../helpers/utils/numbers';

const TxRow = props => {
  // 缩短txId
  const shorten = v =>
    typeof v === 'string' ? `${v.slice(0, 8)}...${v.slice(-8)}` : '';

  // 是否支出
  const isOut = props.direction === 'out';

  // 金额符号
  const amountSign = isOut ? '-' : '+';

  // icon
  const iconName = isOut
    ? 'subdirectory-arrow-left'
    : 'subdirectory-arrow-right';

  const isOk = props.tyname === 'ExecOk';

  const color = isOut ? colors.success : colors.theme;

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={StyleSheet.flatten([styles.wrapper, props.style])}>
      <View style={styles.left}>
        <View style={styles.iconsWrapper}>
          {isOk ? (
            <Icon color={color} name={iconName} />
          ) : (
            <Icon name="error" color={colors.warn} size={18} />
          )}
        </View>
        <View>
          <PrimaryText>{shorten(props.txid)}</PrimaryText>
          <SmallText>
            {props.day} {props.time}
          </SmallText>
        </View>
      </View>
      <View style={styles.right}>
        <PrimaryText color="primary">
          {amountSign} {upperUnit(props.amount)} {props.symbol}
        </PrimaryText>
      </View>
    </TouchableOpacity>
  );
};

TxRow.defaultProps = {
  title: 'name',
  amount: 'amount',
  day: 'YYYY.MM.DD',
  time: 'hh:mm',
  onPress: () => undefined,
};

export default TxRow;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: vw(4),
    paddingVertical: vw(2),
  },
  iconsWrapper: {
    width: vw(10),
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: vw(4),
  },
  left: {
    flexDirection: 'row',
  },
  right: {
    justifyContent: 'center',
  },
  transactionTitle: {
    paddingLeft: metrics.spaceS,
    paddingVertical: vw(1),
    borderBottomWidth: 1,
    borderColor: colors.divider,
  },
});
