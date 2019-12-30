import React from 'react';
import {
  View,
  StyleSheet,
  Clipboard,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Icon, ListItem, Overlay, Input} from 'react-native-elements';
import i18n from '../../helpers/i18n';
import {PrimaryText, SmallText} from 'react-native-normalization-text';
import {metrics, vw, vh} from '../../helpers/metric';
import colors from '../../helpers/colors';
import {Button} from 'react-native-elements';
import FormRow from '../../components/FormRow';
import {useNavigationParam} from 'react-navigation-hooks';
import {eventTypes, WVEvent} from '../../helpers/eventEmmiter';
import _get from 'lodash/get';
import {wallet} from '../../redux/actions';


export default (props) => {
  const [enterPasswordVisible, setEnterPasswordVisible] = React.useState(false);
  const [exportPrivateKeyVisible, setExportPrivateKeyVisible] = React.useState(false);
  const [privateKey, setPrivateKey] = React.useState('');
  const [password, setPassword] = React.useState('');

  // 当前钱包
  const currentWallet = useSelector(
    state => _get(state.wallets, ['currentWallet']) || [],
  );

  const dispatch = useDispatch();

  /**
   * 删除钱包
   */
  const deleteWalletHandle = () => {
    dispatch(wallet.removeAWallet(currentWallet));
  };

  /**
   * 导出私钥输入密码，解密
   */
  const exportPrivateKeyConfirm = () => {
    console.log(password)
    // 创建
    WVEvent.emitEvent(eventTypes.POST_WEB_VIEW, [
      {
        payload: {
          action: eventTypes.AES_DECRYPT,
          data: currentWallet.encryptedPrivateKey,
          password,
        },
        callback: v => {
          setPrivateKey(v);
        },
      },
    ]);
  };

  /**
   * 复制私钥
   */
  const copy =() => {
    Clipboard.setString(currentWallet.encryptedPrivateKey);   
  }

  return (
    <>
      <PrimaryText style={styles.addressCard}>{currentWallet.address}</PrimaryText>
      <View>
        {/* 钱包名称 */}
        <FormRow
          title={i18n.t('walletName')}
          placeholder={currentWallet.name || i18n.t('createWalletNamePlaceholder')}
          bottomDivider
        />
        {/* 修改密码 */}
        <FormRow
          title={i18n.t('changePassword')}
          chevron={{size: 24}}
          bottomDivider
          containerStyle={{}}
          // onPress={goSelectToken}
          editable={false}
        />
        {/* 导出私钥 */}
        <FormRow
          title={i18n.t('exportPrivateKey')}
          chevron={{size: 24}}
          bottomDivider
          containerStyle={{marginTop: 10}}
          onPress={() => setEnterPasswordVisible(true)}
          editable={false}
        />
      </View>
      {/* 删除钱包 */}
      <Button
        iconRight
        buttonStyle={styles.btnContainer}
        title={i18n.t('deleteWallet')}
        onPress={deleteWalletHandle}
      />
      <Overlay
        isVisible={enterPasswordVisible}
        height={vh(20)}
        onBackdropPress={() => setEnterPasswordVisible(false)}
      >
        <PrimaryText>{i18n.t('enterYourPassword')}</PrimaryText>
        <Input
          secureTextEntry={true}
          autoFocus={true}
          onChangeText={setPassword}
          value={password}
        />
        <View style={styles.enterPasswordBtns}>
          <PrimaryText 
            onPress={() => setEnterPasswordVisible(false)}
            style={{marginTop: vw(3),color: colors.theme}}
          >{i18n.t('cancel')}</PrimaryText>
          <PrimaryText 
            // onPress={() => {setExportPrivateKeyVisible(true); setEnterPasswordVisible(false)}} 
            onPress={exportPrivateKeyConfirm}
            style={{marginLeft: vw(10), marginTop: vw(3), color: colors.theme}}
          >{i18n.t('done')}</PrimaryText>
        </View>
      </Overlay>
      <Overlay
        overlayStyle={styles.copyOverlay}
        isVisible={exportPrivateKeyVisible}
        height={'auto'}
        onBackdropPress={() => setExportPrivateKeyVisible(false)}
      >
        <PrimaryText style={styles.copyTitle}>{i18n.t('prompt')}</PrimaryText>
        <SmallText style={styles.copyWaringText}>{i18n.t('exportPrivateKeyWarning')}</SmallText>
        <SmallText style={styles.privateKeyText}>{privateKey}</SmallText>
        <Button 
          // buttonStyle={styles.button}
          title={i18n.t('copyPrivateKey')}
          onPress={copy}
        />
      </Overlay>
    </>
  );
};

const styles = StyleSheet.create({
  walletCard: {
    marginBottom: 15
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