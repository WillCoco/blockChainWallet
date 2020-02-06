import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Icon, Button} from 'react-native-elements';
import i18n from '../../helpers/i18n';
import {PrimaryText} from 'react-native-normalization-text';
import {metrics, vw, vh} from '../../helpers/metric';
import colors from '../../helpers/colors';
import FormRow from '../../components/FormRow';
import {useNavigation} from 'react-navigation-hooks';
import {NavigationActions} from 'react-navigation';
import _get from 'lodash/get';
import {wallet} from '../../redux/actions';
import {Toast} from '../../components/Toast';
import NavBar from '../../components/NavBar';
// import Dialog from '../../components/Dialog';
import {Overlay} from '../../components/Mask';

const WalletDetails = props => {
  // const [password, setPassword] = useState('');
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
  const deleteWallet = () => {
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
    if (!password) {
      return;
    }

    // 验证密码
    const isValidPassword = await dispatch(wallet.validPassword(password));
    // setPasswordValidVisible(false);
    if (!isValidPassword) {
      Toast.show({data: i18n.t('passwordValidFailed')});
      return;
    }
    // 解密
    dispatch(
      wallet.aesDecrypt({data: currentWallet.encryptedPrivateKey, password}),
    ).then(v => {
      // setPasswordValidVisible(false);
      // requestAnimationFrame(() => {
      // setTimeout(() => {
      // }, 500);
      // });
      // setPassword('');
    });
  };

  /**
   * 导出助记词
   */
  const exportMnemonicConfirm = async password => {
    // 解密
    dispatch(
      wallet.aesDecrypt({data: currentWallet.encryptedMnemonic, password}),
    ).then(v => {
      InteractionManager.runAfterInteractions(() => {
        Overlay.push(Overlay.contentTypes.SECRET_EXPORT, {
          customData: {
            subTitle: i18n.t('exportPrivateKeyWarning'),
            copyText: i18n.t('copyMnemonic'),
            exportString: v,
          },
        });
      });
    });
  };

  /**
   * 保存按钮，即更新钱包
   */
  const saveWallet = () => {
    dispatch(wallet.addOrUpdateAWallet(currentWallet));
    navigate('WalletManagement');
  };

  /**
   * 点击导出私钥
   */
  const onPressExportPrivateKey = () => {
    // setPasswordValidVisible(true);
  };

  /**
   * 点击导出助记词
   */
  const onPressExportMnemonic = () => {
    Overlay.setPause(false);
    Overlay.push(Overlay.contentTypes.DIALOG_PASSWORD_VALID, {
      dialog: {
        canCancel: true,
        onValidEnd: (isValid, pwd) => {
          if (isValid) {
            exportMnemonicConfirm(pwd);
          } else {
            Overlay.remove();
          }
        },
      },
    });
    // setPasswordValidVisible(true);
  };

  /**
   * 点击删除
   */
  const onPressDelete = () => {
    Overlay.setPause(false);
    Overlay.push(Overlay.contentTypes.DIALOG_PASSWORD_VALID, {
      dialog: {
        canCancel: true,
        onValidEnd: isValid => {
          if (isValid) {
            deleteWallet();
          } else {
            Overlay.remove();
          }
        },
      },
    });
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
          inputStyle={{paddingLeft: '35%'}}
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
        {/* todo:导出私钥 */}
        {/*<FormRow*/}
          {/*title={i18n.t('exportPrivateKey')}*/}
          {/*chevron={{size: 24}}*/}
          {/*bottomDivider*/}
          {/*containerStyle={{paddingTop: metrics.spaceN}}*/}
          {/*onPress={onPressExportPrivateKey}*/}
          {/*editable={false}*/}
        {/*/>*/}
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
});

export default WalletDetails;
