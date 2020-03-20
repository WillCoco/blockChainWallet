// eslint-disable-next-line no-unused-vars
import React from 'react';
import {ScrollView, View, StyleSheet, Clipboard, Linking} from 'react-native';
import {Icon} from 'react-native-elements';
import _get from 'lodash/get';
import {useNavigationParam} from 'react-navigation-hooks';
import colors from '../../helpers/colors';
import {H4, PrimaryText, scale} from 'react-native-normalization-text';
import i18n from '../../helpers/i18n';
import {vh, vw, metrics} from '../../helpers/metric/index';
import {upperUnit} from '../../helpers/utils/numbers';
import {chainInfo, env} from '../../config';
import {Toast} from '../../components/Toast';
import PhoneShapeWrapper from '../../components/PhoneShapeWrapper';
import {Loading} from '../../components/Mask';
import coinModals from '../../coins';

const DealDetails = () => {
  /**
   * 接收参数-交易信息
   */
  const txFromNavParam = useNavigationParam('txInfo') || {};

  /**
   * 接收参数-币种
   */
  const asset = useNavigationParam('asset') || {};
  // console.log(asset, 'asset')

  /**
   * 接收参数-获取tx信息方法
   */
  const getTx = useNavigationParam('getTx');

  /**
   * 主币种
   */
  const mainCoin = coinModals[asset.attachSymbol || asset.symbol];
  // console.log(mainCoin, 'mainCoin')

  /**
   * 该币种的交易详情是否需要网络请求
   */
  const isNeedFetch = !!getTx;

  /**
   * 交易数据
   */
  const defaultTx = isNeedFetch ? {} : txFromNavParam;
  const [tx, setTx] = React.useState(defaultTx);

  /**
   * 详情需要发起请求的情况
   */
  React.useEffect(() => {
    if (getTx) {
      Loading.set({visible: true});
      getTx()
        .then(r => {
          if (r) {
            setTx(r);
            return;
          }
          Toast.show({data: i18n.t('getTxDetailFailed')});
        })
        .finally(() => {
          Loading.set({visible: false});
        });
    }
  }, []);

  /**
   * 复制
   */
  const copy = v => {
    Clipboard.setString(v);
    Toast.show({data: i18n.t('copySuccess')});
  };

  /**
   * 跳转区块浏览器
   */
  const onPressLink = () => {
    const network = env === 'testnet' ? 'testnet/' : '';
    Linking.openURL(`${chainInfo.explorerUrl}/#/${network}tx/${tx.txid}`);
  };

  /**
   * 成功失败
   */
  const isOk = !tx.tyname || tx.tyname === 'ExecOk';

  /**
   * 发送栏
   */
  const renderSender = sender => {
    return (
      <View style={styles.detailsItem}>
        <PrimaryText style={styles.itemLeft}>From:</PrimaryText>
        <View style={{flex: 8}}>
          {Array.isArray(sender) ? (
            sender.map((s, i) => (
              <View key={`sender_${i}`}>
                <PrimaryText
                  style={{flex: 1}}
                  onPress={() => copy(_get(s, 'address'))}>
                  {_get(s, 'address')}
                </PrimaryText>
                <PrimaryText>
                  {upperUnit(_get(s, 'value'))} {asset.symbol}
                </PrimaryText>
              </View>
            ))
          ) : (
            <PrimaryText
              style={styles.itemRight}
              onPress={() => copy(tx.sender)}>
              {tx.sender}
            </PrimaryText>
          )}
        </View>
      </View>
    );
  };

  /**
   * 接收栏
   */
  const renderReceiver = sender => {
    return (
      <View style={styles.detailsItem}>
        <PrimaryText style={styles.itemLeft}>To:</PrimaryText>
        <View style={{flex: 8}}>
          {Array.isArray(sender) ? (
            sender.map((s, i) => (
              <View key={`receiver_${i}`}>
                <PrimaryText
                  style={{flex: 1}}
                  onPress={() => copy(_get(s, 'address'))}>
                  {_get(s, 'address')}
                </PrimaryText>
                <PrimaryText style={{flex: -1}}>
                  {upperUnit(_get(s, 'value'))} {asset.symbol}
                </PrimaryText>
              </View>
            ))
          ) : (
            <PrimaryText
              style={styles.itemRight}
              onPress={() => copy(tx.sender)}>
              {tx.sender}
            </PrimaryText>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <PhoneShapeWrapper>
        <ScrollView>
          <View style={styles.contentWrapper}>
            <View style={styles.dealType}>
              {!isOk ? (
                <Icon name="error" color={colors.warn} size={48} />
              ) : (
                <Icon
                  type="antdesign"
                  name="checkcircle"
                  color={colors.success}
                  size={40}
                />
              )}
              <H4 style={{marginTop: metrics.spaceS}}>
                {!isOk ? i18n.t('failed') : i18n.t('succeed')}
              </H4>
              <PrimaryText>
                {tx.day} {tx.time}
              </PrimaryText>
            </View>
            <View style={styles.boxWrapper}>
              {tx.amount ? (
                <View style={styles.detailsItem}>
                  <PrimaryText style={styles.itemLeft}>
                    {i18n.t('amount') + ':'}
                  </PrimaryText>
                  <PrimaryText
                    style={styles.itemRight}
                    onPress={() => copy(tx.amount)}>
                    {tx.sign} {upperUnit(tx.amount)} {tx.symbol}
                  </PrimaryText>
                </View>
              ) : null}
              {renderSender(tx.sender)}
              {renderReceiver(tx.receiver)}
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
              {!!tx.errinfo ? (
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
              ) : null}
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
    flex: 1.4,
    minWidth: 24,
    maxWidth: scale(64),
    color: colors.textSecondary,
  },
  itemRight: {
    flex: 8,
    flexDirection: 'row',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  link: {
    textAlign: 'center',
    color: colors.theme,
    marginVertical: metrics.spaceN,
  },
});

DealDetails.defaultProps = {
  time: '2020年01月07日18:52:25',
  txid: '',
  sign: '',
  amount: '',
  symbol: '',
  sender: '',
  receiver: '',
  note: '',
  blockheight: '',
  errinfo: '',
  direction: '',
  tyname: 'ok',
};

export default DealDetails;
