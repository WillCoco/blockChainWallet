/**
 * @author: Xu Ke
 * @date: 2020/2/4 1:08 PM
 * @Description: 私钥、助记词等导出窗
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Clipboard,
} from 'react-native';
import {SmallText, PrimaryText} from 'react-native-normalization-text';
import {useSelector, useDispatch} from 'react-redux';
import _get from 'lodash/get';
import {useNavigation} from 'react-navigation-hooks';
import {Icon, ListItem, Overlay as Overl, Button} from 'react-native-elements';
import colors from '../../../helpers/colors';
import {vh, vw, metrics} from '../../../helpers/metric';
import safePage from '../../../helpers/safePage';
import {wallet} from '../../../redux/actions';
import i18n from '../../../helpers/i18n';
import {Toast} from '../../../components/Toast';

const SecretExport = props => {
  const dispatch = useDispatch();

  // 当前钱包
  const currentWallet = useSelector(
    state => _get(state.wallets, ['currentWallet']) || [],
  );

  // 钱包列表
  const walletsList = useSelector(
    state => _get(state.wallets, ['walletsList']) || [],
  );

  // 关闭overlay
  const closeOverlay = () => {
    // console.log(props.remove, 'removeeeee')
    props.remove();
  };

  // 切换钱包
  const checkWallet = address => {
    // checkWallet
    dispatch(wallet.updateCurrentWallet(address));
    closeOverlay();
  };

  // 前往创建钱包
  const goCreateWallet = () => {
    closeOverlay();
    navigate({routeName: 'CreateWallet', key: 'HOME_PAGE'});
  };

  const {navigate} = useNavigation();

  /**
   * 复制
   */
  const copy = v => {
    Clipboard.setString(v);
    Toast.show({data: i18n.t('copySuccess')});
    props.remove();
    props.onCopied && props.onCopied();
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.contentWrapper}>
        <PrimaryText style={styles.copyTitle}>
          {props.title}
        </PrimaryText>
        <SmallText style={styles.copyWaringText}>
          {props.subTitle}
        </SmallText>
        <SmallText style={styles.privateKeyText}>{props.exportString}</SmallText>
        <Button
          // buttonStyle={styles.button}
          title={props.copyText}
          onPress={() => copy(props.exportString)}
        />
      </View>
    </View>
  );
};

const SafeSecretExportExport = props => safePage(SecretExport, props);

SafeSecretExportExport.defaultProps = {
  title: '',
  subTitle: '',
  exportString: '',
  copyText: '复制',
  onCopied: () => undefined,
  currentWallet: undefined,
  walletFormat: v => v && v.name,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    backgroundColor: '#fff',
    padding: metrics.spaceS,
    width: vw(80),
    borderRadius: vw(0.5),
  },
  copyOverlay: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  copyTitle: {
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: '600',
    color: colors.textTitle,
  },
  copyWaringText: {
    marginBottom: 10,
    backgroundColor: '#fbf0ee',
    color: colors.textError,
  },
  privateKeyText: {
    marginBottom: 10,
    backgroundColor: colors.textDark3,
    padding: vw(2),
    color: colors.textPrimary,
  },
});

export default SafeSecretExportExport;
