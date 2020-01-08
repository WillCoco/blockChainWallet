import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Clipboard,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Icon, ListItem, Overlay} from 'react-native-elements';
import i18n from '../../helpers/i18n';
import {PrimaryText, SmallText} from 'react-native-normalization-text';
import {Button} from 'react-native-elements';
import {metrics, vw, vh} from '../../helpers/metric';
import colors from '../../helpers/colors';
import FormRow from '../../components/FormRow';
import {useNavigation} from 'react-navigation-hooks';
import {NavigationActions} from 'react-navigation';
import _get from 'lodash/get';
import {wallet} from '../../redux/actions';
import {Toast} from '../../components/Toast';
import NavBar from '../../components/NavBar';
import Dialog from '../../components/Dialog';

const WalletDetails = props => {
  const [passwordValidVisible, setPasswordValidVisible] = useState(false);
  const [exportVisible, setExportVisible] = useState(false);
  const [privateKey, setPrivateKey] = useState('');
  const [password, setPassword] = useState('');
  const [currentWallet, setCurrentWallet] = useState(
    _get(props, ['navigation', 'state', 'params']) || {},
  );
  const {navigate, goBack, reset} = useNavigation();

  // 当前钱包名字，显示在标题栏，不跟随输入框改变
  const currentWalletName =
    _get(props, ['navigation', 'state', 'params', 'name']) || '';
  const dispatch = useDispatch();

  /**
   * 删除钱包
   */
  const deleteWallet = async password => {
    const isValidPassword = await dispatch(wallet.validPassword(password));

    setPasswordValidVisible(false);
    if (!isValidPassword) {
      Toast.show({data: i18n.t('passwordValidFailed')});
      return;
    }

    const newWalletList = dispatch(wallet.removeAWallet(currentWallet)) || [];
    Toast.show({data: i18n.t('removeWalletSuccess')});

    if (newWalletList.length > 0) {
      goBack();
    } else {
      reset([NavigationActions.navigate({routeName: 'Guide'})], 0);
    }
  };

  /**
   * 导出私钥输入密码，解密
   * todo: 导出masterKey
   */
  const exportPrivateKeyConfirm = async password => {
    // 验证密码
    const isValidPassword = await dispatch(wallet.validPassword(password));
    setPasswordValidVisible(false);
    if (!isValidPassword) {
      Toast.show({data: i18n.t('passwordValidFailed')});
      return;
    }
    // 解密
    dispatch(
      wallet.aesDecrypt({data: currentWallet.encryptedPrivateKey, password}),
    ).then(v => {
      setPrivateKey(v);
      setPasswordValidVisible(false);
      // requestAnimationFrame(() => {
      setTimeout(() => {
        setExportVisible(true);
      }, 500)
      // });
      setPassword('');
    });
  };

  /**
   * 导出助记词
   */
  const exportMnemonicConfirm = async password => {
    // 验证密码
    console.log(password, 'password111')
    const isValidPassword = await dispatch(wallet.validPassword(password));
    setPasswordValidVisible(false);
    console.log(isValidPassword, 'isValidPassword');
    if (!isValidPassword) {
      Toast.show({data: i18n.t('passwordValidFailed')});
      return;
    }
    // 解密
    dispatch(
      wallet.aesDecrypt({data: currentWallet.encryptedMnemonic, password}),
    ).then(v => {
      setPrivateKey(v);
      setExportVisible(true);
      setPasswordValidVisible(false);
      setPassword('');
    });
  };

  // 输密码后的动作意图
  const actionTypes = {
    // 导出私钥
    EXPORT_PRIVATE_KEY: {
      overlayCopyTitle: i18n.t('copyPrivateKey'),
      onPressDialogOk: exportPrivateKeyConfirm,
    },
    // 导出助记词
    EXPORT_MNEMONIC: {
      overlayCopyTitle: i18n.t('copyMnemonic'),
      onPressDialogOk: exportMnemonicConfirm,
    },
    // 删除账户
    REMOVE_WALLET: {
      onPressDialogOk: deleteWallet,
    },
  };
  const action = React.useRef(actionTypes.EXPORT_PRIVATE_KEY);

  /**
   * 保存按钮，即更新钱包
   */
  const saveWallet = () => {
    dispatch(wallet.addOrUpdateAWallet(currentWallet));
    navigate('WalletManagement');
  };

  /**
   * 复制
   */
  const copy = v => {
    Clipboard.setString(v);
    Toast.show({data: i18n.t('copySuccess')});
    setExportVisible(false);
  };

  /**
   * 点击导出私钥
   */
  const onPressExportPrivateKey = () => {
    action.current = actionTypes.EXPORT_PRIVATE_KEY;
    setPasswordValidVisible(true);
  };

  /**
   * 点击导出助记词
   */
  const onPressExportMnemonic = () => {
    action.current = actionTypes.EXPORT_MNEMONIC;
    setPasswordValidVisible(true);
  };

  /**
   * 点击删除
   */
  const onPressDelete = () => {
    action.current = actionTypes.REMOVE_WALLET;
    setPasswordValidVisible(true);
  };

  return (
    <>
      <NavBar
        title={currentWalletName}
        rightElement={
          <PrimaryText style={{color: colors.textWhite}}>
            {i18n.t('save')}
          </PrimaryText>
        }
        onRight={saveWallet}
      />
      <View style={styles.addressCard}>
        <PrimaryText style={styles.addressText}>
          {_get(currentWallet, 'address')}
        </PrimaryText>
        <TouchableOpacity onPress={() => copy(_get(currentWallet, 'address'))}>
          <Icon
            type="material-community"
            name="content-copy"
            color="white"
            size={vw(4)}
          />
        </TouchableOpacity>
      </View>
      <View>
        {/* 钱包名称 */}
        <FormRow
          title={i18n.t('walletName')}
          placeholder={
            _get(currentWallet, 'name') || i18n.t('createWalletNamePlaceholder')
          }
          bottomDivider
          value={_get(currentWallet, 'name')}
          onChangeText={v => setCurrentWallet({...currentWallet, name: v})}
          maxLength={12}
          inputStyle={{paddingHorizontal: '30%'}}
        />
        {/* 修改密码 */}
        {/* <FormRow
          title={i18n.t('changePassword')}
          chevron={{size: 24}}
          bottomDivider
          containerStyle={{}}
          onPress={navigate('ChangePassword')}
          editable={false}
        /> */}
        {/* 导出私钥 */}
        <FormRow
          title={i18n.t('exportPrivateKey')}
          chevron={{size: 24}}
          bottomDivider
          containerStyle={{paddingTop: metrics.spaceN}}
          onPress={onPressExportPrivateKey}
          editable={false}
        />
        <FormRow
          title={i18n.t('exportMnemonic')}
          chevron={{size: 24}}
          bottomDivider
          containerStyle={{paddingTop: metrics.spaceN}}
          onPress={onPressExportMnemonic}
          editable={false}
        />
      </View>
      {/* 删除钱包 */}
      <Button
        iconRight
        buttonStyle={styles.btnContainer}
        title={i18n.t('deleteWallet')}
        onPress={onPressDelete}
      />
      <Dialog
        showInput
        description={i18n.t('passwordValidDesc')}
        visible={passwordValidVisible}
        onChangeText={setPassword}
        onCancelPress={() => setPasswordValidVisible(false)}
        onOKPress={() => action.current.onPressDialogOk(password)}
      />
      <Overlay
        overlayStyle={styles.copyOverlay}
        isVisible={exportVisible}
        height={'auto'}
        onBackdropPress={() => setExportVisible(false)}>
        <>
          <PrimaryText style={styles.copyTitle}>
            {action.current.overlayTitle}
          </PrimaryText>
          <SmallText style={styles.copyWaringText}>
            {i18n.t('exportPrivateKeyWarning')}
          </SmallText>
          <SmallText style={styles.privateKeyText}>{privateKey}</SmallText>
          <Button
            // buttonStyle={styles.button}
            title={action.current.overlayCopyTitle}
            onPress={() => copy(privateKey)}
          />
        </>
      </Overlay>
    </>
  );
};

const styles = StyleSheet.create({
  walletCard: {
    marginBottom: 15,
  },
  addressCard: {
    maxWidth: '100%',
    height: vh(20),
    backgroundColor: colors.theme,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  addressText: {
    maxWidth: '80%',
    color: '#fff',
    textAlign: 'center',
    marginRight: metrics.spaceS,
  },
  btnContainer: {
    width: '90%',
    marginTop: vw(10),
    alignSelf: 'center',
    backgroundColor: colors.warn,
  },
  enterPasswordBtns: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: vw(3),
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

export default WalletDetails;
