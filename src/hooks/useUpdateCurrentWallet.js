/**
 * 当前钱包账户升级
 */
import {useSelector, useDispatch} from 'react-redux';
import _get from 'lodash/get';
import React from 'react';
import {Overlay} from '../components/Mask';
import {wallet} from '../redux/actions';
import {Toast} from '../components/Toast';
import i18n from '../helpers/i18n';

const defaultCurrentWallet = {};

function useUpdateCurrentWallet() {
  const dispatch = useDispatch();
  /**
   * 当前钱包
   */
  const currentWallet = useSelector(
    state => _get(state.wallets, ['currentWallet']) || defaultCurrentWallet,
  );

  /**
   * 更新
   */
  const doWalletUpdate = React.useCallback(() => {
    // todo: 引导弹窗

    // 验证密码
    Overlay.push(Overlay.contentTypes.DIALOG_PASSWORD_VALID, {
      dialog: {
        canCancel: false,
        onValidEnd,
      },
    });

    async function onValidEnd(isValid, pwd) {
      if (isValid) {
        const success = await dispatch(
          wallet.updateWalletVersion(currentWallet, pwd)
        );
        if (success) {
          Toast.show({data: i18n.t('walletUpdateSucceed')});
        } else {
          Toast.show({data: i18n.t('walletUpdateFailed')});
        }
      }
    }
  }, [currentWallet, dispatch]);

  React.useEffect(() => {
    console.log(currentWallet.id, 'currentWallet.id');
    if (!currentWallet.coins) {
      doWalletUpdate();
    }
  }, [currentWallet, doWalletUpdate]);
}

export default useUpdateCurrentWallet;
