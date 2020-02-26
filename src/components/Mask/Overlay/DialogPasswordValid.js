/**
 * @author: Xu Ke
 * @date: 2020/2/4 12:05 PM
 * @Description:
 * 密码验证器：
 *  1.验证结果回调
 *  2.是否可取消验证
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import _get from 'lodash/get';
import Dialog from '../../../components/Dialog';
import {Toast} from '../../../components/Toast';
import {wallet} from '../../../redux/actions';
import i18n from '../../../helpers/i18n';
import safePage from '../../../helpers/safePage';
import {eventTypes, WVEvent} from '../../../helpers/eventEmmiter';

const PasswordValid = props => {
  const currentWallet = useSelector(
    state => _get(state, ['wallets', 'currentWallet']) || {},
  );

  const dispatch = useDispatch();

  const [pwd, setPwd] = React.useState(null);

  const onOKPress = async () => {
    if (!pwd) {
      return;
    }

    // 校验密码
    const isValid = await isValidPwd();

    // 暂停显示modal
    props.setPause(true);

    // 密码错误
    if (!isValid) {
      Toast.show({data: i18n.t('passwordValidFailed')});
      // console.log(currentWallet.encryptedPrivateKey, 'encryptedPrivateKey');
      // console.log(currentWallet.passwordKey, 'passwordKey');

      setTimeout(() => {
        props.setPause(false);
      }, 1000);

      // 结果回调
      props.onValidEnd(false);
      return;
    }

    // 正确,生成tempMnemonic进行备份操作
    const tempMnemonic = await updateTempMnemonic();
    // console.log(tempMnemonic, 'tempMnemonic');
    if (!tempMnemonic) {
      Toast.show({data: i18n.t('error')});
    }

    dispatch(wallet.updateTempMnemonic(tempMnemonic));
    setPwd('');
    props.remove();
    props.setPause(false);

    // 结果回调
    // console.log(props.onValidEnd, 'list_onValidEnd');
    props.onValidEnd(true, pwd);
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
      canCancel={props.canCancel}
      description={i18n.t('passwordValidDesc')}
      visible={props.visible}
      onChangeText={setPwd}
      value={pwd}
      onCancelPress={() => {
        props.remove();
        props.onCancel();
      }}
      onOKPress={onOKPress}
      secureTextEntry={true}
    />
  );
};

PasswordValid.defaultProps = {
  canCancel: false,
  onValidEnd: () => undefined,
  onCancel: () => undefined,
};

const styles = StyleSheet.create({});

export default props => safePage(PasswordValid, props);
