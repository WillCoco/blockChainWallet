import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Clipboard,
  Text,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Icon, ListItem, Overlay, Input} from 'react-native-elements';
import i18n from '../../helpers/i18n';
import {PrimaryText, SmallText} from 'react-native-normalization-text';
import {metrics, vw, vh} from '../../helpers/metric';
import colors from '../../helpers/colors';
import {Button} from 'react-native-elements';
import FormRow from '../../components/FormRow';
import {useNavigationParam, useNavigation} from 'react-navigation-hooks';
import {eventTypes, WVEvent} from '../../helpers/eventEmmiter';
import _get from 'lodash/get';
import {wallet} from '../../redux/actions';
import {Toast} from '../../components/Toast';
import NavBar from '../../components/NavBar';
import Dialog from '../../components/Dialog';

const WalletDetails = (props) => {
  const [passwordValidVisible, setPasswordValidVisible] = useState(false);
  const [exportPrivateKeyVisible, setExportPrivateKeyVisible] = useState(false);
  const [privateKey, setPrivateKey] = useState('');
  const [password, setPassword] = useState('');
  const [currentWallet, setCurrentWallet] = useState(_get(props, ['navigation', 'state', 'params']) || {});
  const {navigate, goBack} = useNavigation();


  // 当前钱包名字，显示在标题栏，不跟随输入框改变
  const currentWalletName = _get(props, ['navigation', 'state', 'params', 'name']) || '';
  const dispatch = useDispatch();

  /**
   * 删除钱包
   */
  const deleteWallet = async () => {
    await dispatch(wallet.removeAWallet(currentWallet));
    Toast.show({data: i18n.t('removeWalletSuccess')});
    goBack();
  };

  /**
   * 导出私钥输入密码，解密
   */
  const exportPrivateKeyConfirm = async () => {
    // 验证密码
    const isValidPassword = await dispatch(wallet.validPassword(password));
    setPasswordValidVisible(false);
    console.log(isValidPassword, 'isValidPassword');
    if (!isValidPassword) {
      Toast.show({data: '密码验证失败'});
      return;
    }
    // 解密
    WVEvent.emitEvent(eventTypes.POST_WEB_VIEW, [
      {
        payload: {
          action: eventTypes.AES_DECRYPT,
          data: currentWallet.encryptedPrivateKey,
          password,
        },
        callback: v => {
          setPrivateKey(v);
          setExportPrivateKeyVisible(true); 
          setPasswordValidVisible(false);
          setPassword('');
        },
      },
    ]);
  };

  /**
   * 保存按钮，即更新钱包
   */
  const saveWallet = () => {
    dispatch(wallet.addOrUpdateAWallet(currentWallet));
    navigate('WalletManagement');
  };

  /**
   * 复制私钥
   */
  const copy = () => {
    Clipboard.setString(privateKey);
    Toast.show({data: '复制私钥成功'});
    setExportPrivateKeyVisible(false);
  };

  return (
    <>
      <NavBar
        title={currentWalletName}
        rightElement={
          <Text style={{color: colors.textWhite}}>{i18n.t('save')}</Text>
        }
        onRight={saveWallet}
      />
      <SmallText style={styles.addressCard}>{currentWallet && currentWallet.address}</SmallText>
      <View>
        {/* 钱包名称 */}
        <FormRow
          title={i18n.t('walletName')}
          placeholder={currentWallet && currentWallet.name || i18n.t('createWalletNamePlaceholder')}
          bottomDivider
          onChange={v => setCurrentWallet({...currentWallet, name: v})}
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
          containerStyle={{marginTop: 10}}
          onPress={() => setPasswordValidVisible(true)}
          editable={false}
        />
      </View>
      {/* 删除钱包 */}
      <Button
        iconRight
        buttonStyle={styles.btnContainer}
        title={i18n.t('deleteWallet')}
        onPress={deleteWallet}
      />
      <Dialog
        showInput
        description={i18n.t('passwordValidDesc')}
        visible={passwordValidVisible}
        onChangeText={setPassword}
        onCancelPress={() => setPasswordValidVisible(false)}
        onOKPress={exportPrivateKeyConfirm}
      />
      <Overlay
        overlayStyle={styles.copyOverlay}
        isVisible={exportPrivateKeyVisible}
        height={'auto'}
        onBackdropPress={() => setExportPrivateKeyVisible(false)}>
        <>
          <PrimaryText style={styles.copyTitle}>{i18n.t('prompt')}</PrimaryText>
          <SmallText style={styles.copyWaringText}>{i18n.t('exportPrivateKeyWarning')}</SmallText>
          <SmallText style={styles.privateKeyText}>{privateKey}</SmallText>
          <Button
            // buttonStyle={styles.button}
            title={i18n.t('copyPrivateKey')}
            onPress={copy}
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
    height: vh(20),
    backgroundColor: colors.theme,
    color: '#fff',
    textAlign: 'center',
    paddingTop: 20,
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