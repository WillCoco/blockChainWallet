// eslint-disable-next-line no-unused-vars
import React from 'react';
import {ScrollView, View, StyleSheet, Clipboard, Linking} from 'react-native';
import {Icon} from 'react-native-elements';
// import _get from 'lodash/get';
import {useNavigationParam} from 'react-navigation-hooks';
import colors from '../../helpers/colors';
import {H4, PrimaryText, scale} from 'react-native-normalization-text';
import i18n from '../../helpers/i18n';
import {vh, vw, metrics} from '../../helpers/metric/index';
import {upperUnit} from '../../helpers/utils/numbers';
import {chainInfo, env} from '../../config';
import {Toast} from '../../components/Toast';
import PhoneShapeWrapper from '../../components/PhoneShapeWrapper';

const DealDetails = () => {
  /**
   * 复制
   */
  const copy = v => {
    Clipboard.setString(v);
    Toast.show({data: i18n.t('copySuccess')});
  };

  /**
   * 接收参数
   */
  const tx = useNavigationParam('txInfo') || {};

  /**
   * 缩短字符串
   */
  const shorten = (v, l = 8) => {
    return typeof v === 'string' ? `${v.slice(0, l)}...${v.slice(-l)}` : '';
  };

  /**
   * 跳转区块浏览器
   */
  const onPressLink = () => {
    const network = env === 'testnet' ? 'testnet/' : '';
    Linking.openURL(`${chainInfo.explorerUrl}/#/${network}tx/${tx.txid}`);
  };

  /**
   * + -符号
   */
  const sign = tx.direction === 'out' ? '-' : '+';

  /**
   * 成功失败
   */
  const isOk = tx.tyname === 'ExecOk';

  return (
    <View style={styles.wrapper}>
      <PhoneShapeWrapper>
        <ScrollView>
          <View style={styles.contentWrapper}>
            <View style={styles.dealType}>
              {isOk ? (
                <Icon
                  type="antdesign"
                  name="checkcircle"
                  color={colors.success}
                  size={40}
                />
              ) : (
                <Icon name="error" color={colors.warn} size={48} />
              )}
              <H4 style={{marginTop: metrics.spaceS}}>
                {isOk ? i18n.t('succeed') : i18n.t('failed')}
              </H4>
              <PrimaryText>
                {tx.day} {tx.time}
              </PrimaryText>
            </View>
            <View style={styles.boxWrapper}>
              <View style={styles.detailsItem}>
                <PrimaryText style={styles.itemLeft}>
                  {i18n.t('amount') + ':'}
                </PrimaryText>
                <PrimaryText
                  style={styles.itemRight}
                  onPress={() => copy(tx.amount)}>
                  {sign} {upperUnit(tx.amount)} {tx.symbol}
                </PrimaryText>
              </View>
              <View style={styles.detailsItem}>
                <PrimaryText style={styles.itemLeft}>To:</PrimaryText>
                <PrimaryText
                  style={styles.itemRight}
                  onPress={() => copy(tx.receiver)}>
                  {tx.receiver}
                  {/* <Icon
                    name='copy1'
                    type='antdesign'
                    size={16}
                    color={colors.textDark2}
                    onPress={() => copy('234')}
                  /> */}
                </PrimaryText>
              </View>
              <View style={styles.detailsItem}>
                <PrimaryText style={styles.itemLeft}>
                  From:
                </PrimaryText>
                <PrimaryText
                  style={styles.itemRight}
                  onPress={() => copy(tx.sender)}>
                  {tx.sender}
                </PrimaryText>
              </View>
              {tx.note && (
                <View style={styles.detailsItem}>
                  <PrimaryText style={styles.itemLeft}>
                    {i18n.t('transferNote') + ':'}
                  </PrimaryText>
                  <PrimaryText
                    style={styles.itemRight}
                    onPress={() => copy(tx.note)}>
                    {tx.note}
                  </PrimaryText>
                </View>
              )}
            </View>
            <View style={styles.boxWrapper}>
              <View style={styles.detailsItem}>
                <PrimaryText style={styles.itemLeft}>{'TxID:'}</PrimaryText>
                <PrimaryText
                  style={styles.itemRight}
                  onPress={() => copy(tx.txid)}>
                  {tx.txid}
                </PrimaryText>
              </View>
              <View style={styles.detailsItem}>
                <PrimaryText style={styles.itemLeft}>
                  {i18n.t('block') + ':'}
                </PrimaryText>
                <PrimaryText
                  style={styles.itemRight}
                  onPress={() => copy(tx.blockheight)}>
                  {tx.blockheight}
                </PrimaryText>
              </View>
              {tx.errinfo && (
                <View style={styles.detailsItem}>
                  <PrimaryText style={styles.itemLeft}>
                    {i18n.t('txErrorInfo') + ':'}
                  </PrimaryText>
                  <PrimaryText
                    style={styles.itemRight}
                    onPress={() => copy(tx.errinfo)}>
                    {tx.errinfo}
                  </PrimaryText>
                </View>
              )}
            </View>
          </View>
          <PrimaryText style={styles.link} onPress={onPressLink}>
            {i18n.t('goExplorer')}
          </PrimaryText>
        </ScrollView>
      </PhoneShapeWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.theme,
    // height: '100%',
  },
  contentWrapper: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: vw(4),
    paddingHorizontal: metrics.spaceS,
    backgroundColor: colors.textWhite,
  },
  dealType: {
    alignItems: 'center',
    width: '100%',
    // paddingVertical: vw(4),
  },
  boxWrapper: {
    width: '100%',
    // paddingBottom: 20,
    marginVertical: 10,
    backgroundColor: colors.pageBackground,
    borderRadius: vw(2),
    paddingHorizontal: metrics.spaceS,
  },
  detailsItem: {
    flexDirection: 'row',
    paddingVertical: vw(3),
  },
  itemLeft: {
    flex: 1.5,
    minWidth: 24,
    maxWidth: scale(64),
    color: colors.textSecondary,
  },
  itemRight: {
    flex: 8,
    flexDirection: 'row',
  },
  link: {
    textAlign: 'center',
    color: colors.theme,
    marginTop: metrics.spaceN,
  },
});

DealDetails.defaultProps = {
  time: '2020年01月07日18:52:25',
};

export default DealDetails;
