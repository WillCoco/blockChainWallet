import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, useIsFocused} from 'react-navigation-hooks';
import {StyleSheet} from 'react-native';
import _get from 'lodash/get';
import Dialog from '../../components/Dialog';
import {Toast} from '../../components/Toast';
import {wallet} from '../../redux/actions';
import i18n from '../../helpers/i18n';
import {eventTypes, WVEvent} from '../../helpers/eventEmmiter';

const PasswordValid = props => {
  const currentWallet = useSelector(
    state => _get(state, ['wallets', 'currentWallet']) || {},
  );

  const isFocused = useIsFocused();

  const {navigate} = useNavigation();

  const dispatch = useDispatch();

  const [pwd, setPwd] = React.useState(null);

  const [pwdDialogVisible, setPwdDialogVisible] = React.useState(false);

  React.useEffect(() => {
    if (isFocused && currentWallet.address && !currentWallet.backupCompleted) {
      setPwdDialogVisible(true);
    }
  }, [isFocused, navigate, currentWallet, currentWallet.backupCompleted]);

  const onOKPress = async () => {
    // 校验密码
    const isValid = await isValidPwd();

    setPwdDialogVisible(false);

    // console.log(isValid, 'isValid');

    // 密码错误
    if (!isValid) {
      Toast.show({data: '验证失败'});
      console.log(currentWallet.encryptedPrivateKey, 'encryptedPrivateKey');
      console.log(currentWallet.passwordKey, 'passwordKey');
      setPwdDialogVisible(true);
      return;
    }

    // 正确,生成tempMnemonic进行备份操作
    const tempMnemonic = await updateTempMnemonic();
    // console.log(tempMnemonic, 'tempMnemonic');
    if (!tempMnemonic) {
      Toast.show({data: '操作失败'});
    }

    dispatch(wallet.updateTempMnemonic(tempMnemonic));
    setPwd('');
    setPwdDialogVisible(false);
    navigate('WalletBackUpStep1');
  };

  // 验证密码
  const isValidPwd = () => {
    return new Promise((resolve, reject) => {
      WVEvent.emitEvent(eventTypes.POST_WEB_VIEW, [
        {
          payload: {
            action: eventTypes.SHA_256,
            data: pwd,
          },
          callback: v => {
            // console.log(currentWallet.passwordKey, 'passwordKey');
            resolve(v === currentWallet.passwordKey);
          },
        },
      ]);
    }).catch(err => {
      console.log('isValidPwd', err);
    });
  };

  // 生成临时备份助记词
  const updateTempMnemonic = () => {
    return new Promise(resolve => {
      WVEvent.emitEvent(eventTypes.POST_WEB_VIEW, [
        {
          payload: {
            action: eventTypes.AES_DECRYPT,
            data: currentWallet.encryptedMnemonic,
            password: pwd,
          },
          callback: v => {
            resolve(v);
          },
        },
      ]);
    }).catch(err => {
      console.log('updateTempMneonic', err);
    });
  };

  return (
    <Dialog
      showInput
      autoFocus
      canCancel={false}
      description={i18n.t('passwordValidDesc')}
      visible={pwdDialogVisible}
      onChangeText={setPwd}
      value={pwd}
      onCancelPress={() => setPwdDialogVisible(false)}
      onOKPress={onOKPress}
    />
  );
};

const styles = StyleSheet.create({
});


export default PasswordValid;
