import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigation, useIsFocused} from 'react-navigation-hooks';
import _get from 'lodash/get';
import safePage from '../../helpers/safePage';
import {Overlay} from '../../components/Mask';

const PasswordValid = props => {
  const currentWallet = useSelector(
    state => _get(state, ['wallets', 'currentWallet']) || {},
  );

  const isFocused = useIsFocused();

  const {navigate} = useNavigation();

  /**
   * ios safeOPenModal
   */
  const safeShowPwdDialog = options => {
    // InteractionManager.runAfterInteractions(() => {
    //   setPwdDialogVisible(true);
    Overlay.push(Overlay.contentTypes.DIALOG_PASSWORD_VALID, {
      dialog: {
        canCancel: false,
        onValidEnd,
      },
    });
    // });
  };

  /**
   * 密码验证完 具体业务
   */
  const onValidEnd = isValid => {
    if (isValid) {
      navigate('WalletBackUpStep1');
    }
  };

  React.useEffect(() => {
    if (isFocused && currentWallet.address && !currentWallet.backupCompleted) {
      Overlay.setPause(false);
      safeShowPwdDialog();
    }
  }, [isFocused, navigate, currentWallet, currentWallet.backupCompleted]);

  /**
   * 页面销毁，取消modal暂停，tab时机不销毁
   */
  React.useEffect(() => {
    return () => {
      Overlay.setPause(false);
    };
  }, []);

  return null;
};

export default props => safePage(PasswordValid, props);
