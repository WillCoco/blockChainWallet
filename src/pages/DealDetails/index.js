// eslint-disable-next-line no-unused-vars
import React from 'react';
import {ScrollView, View, StyleSheet, Clipboard, Linking} from 'react-native';
import {Icon} from 'react-native-elements';
import _get from 'lodash/get';
import {useNavigationParam} from 'react-navigation-hooks';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../helpers/colors';
import {H4, PrimaryText} from 'react-native-normalization-text';
import i18n from '../../helpers/i18n';
import {vh, vw, metrics} from '../../helpers/metric/index';
import {upperUnit} from '../../helpers/utils/numbers';
import {chainInfo, env} from '../../config';
import NavBar from '../../components/NavBar';
import {Toast} from '../../components/Toast';

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
    const network = env === 'test' ? 'testnet/' : '';
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
    <LinearGradient
      style={styles.page}
      colors={[colors.theme, '#fff']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 0.2}}>
      <NavBar
        title={i18n.t('dealDetails')}
        safeView={{backgroundColor: 'transparent'}}
      />
      <ScrollView>
        <View style={styles.wrapper}>
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
            <PrimaryText style={{marginTop: metrics.spaceS}}>
              {isOk ? i18n.t('succeed') : i18n.t('failed')}
            </PrimaryText>
            <PrimaryText>
              {tx.day} {tx.time}
            </PrimaryText>
          </View>
          <View style={styles.middleBox}>
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
              <PrimaryText style={styles.itemLeft}>
                {i18n.t('To') + ':'}
              </PrimaryText>
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
                {i18n.t('From') + ':'}
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
          <View style={styles.bottomBox}>
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
          </View>
        </View>
        <PrimaryText style={styles.link} onPress={onPressLink}>
          {i18n.t('goExplorer')}
        </PrimaryText>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  page: {
    height: '100%',
  },
  wrapper: {
    marginHorizontal: vw(5),
    marginTop: vh(2),
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: vw(4),
    width: vw(90),
    borderRadius: 20,
    backgroundColor: colors.textWhite,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
  },
  dealType: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: vw(8),
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderColor: colors.textDark2,
  },
  middleBox: {
    width: '100%',
    paddingBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderColor: colors.textDark2,
  },
  detailsItem: {
    flexDirection: 'row',
    paddingVertical: vw(3),
  },
  itemLeft: {
    flex: 1.5,
    minWidth: 24,
    color: colors.textSecondary,
  },
  itemRight: {
    flex: 8,
    flexDirection: 'row',
  },
  bottomBox: {
    width: '100%',
  },
  link: {
    textAlign: 'center',
    color: colors.theme,
    marginTop: metrics.spaceS,
  },
});

DealDetails.defaultProps = {
  time: '2020年01月07日18:52:25',
};

export default DealDetails;
