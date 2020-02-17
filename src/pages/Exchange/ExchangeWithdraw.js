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
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {PrimaryText, SmallText, scale} from 'react-native-normalization-text';
import _get from 'lodash/get';
import _filter from 'lodash/filter';
import i18n from '../../helpers/i18n';
import {metrics, vw} from '../../helpers/metric';
import safePage from '../../helpers/safePage';
import colors from '../../helpers/colors';
import {chainInfo} from '../../config';
import {Toast} from '../../components/Toast';
import IconHelp from '../../components/Iconfont/IconquestionRedCopy';

const Withdraw = () => {
  useSelector(state => _get(state, ['appSetting', 'language']));

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

  // 兑换
  const onPressExchange = () => {
    alert('');
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
