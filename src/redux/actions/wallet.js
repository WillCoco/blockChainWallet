/**
 * @author: Xu Ke
 * @date: 2019/12/19 2:57 PM
 * @Description: wallet
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import {
  UPDATE_WALLETS,
  UPDATE_CURRENT_WALLET,
  UPDATE_TEMP_MNEMONIC,
  UPDATE_CURRENT_ASSET,
} from './actionTypes';
import _get from 'lodash/get';
import _findIndex from 'lodash/findIndex';
import {safeStringify} from '../../helpers/utils/safetyFn';
import {getAssetByAddress} from './asset';
import {WVEvent, eventTypes} from '../../helpers/eventEmmiter';
import {coins} from '../../config';
import {Toast} from '../../components/Toast';
import i18n from '../../helpers/i18n';

// import {getAddressAsset} from '../../helpers/chain33/';

// /**
//  * 更新wallet webview实例post
//  */
// export function updateWebViewPost(walletPostMessage) {
//   return (dispatch, getState) => {
//     dispatch({type: UPDATE_WALLET_POST_MESSAGE, payload: {walletPostMessage}});
//   };
// }

// /**
//  * 调用webview实例post
//  * @param: {object} msg - 消息体
//  */
// export function webViewPost(msg) {
//   return (dispatch, getState) => {
//     const postWallet = _get(getState().wallets, ['walletPostMessage']);
//     postWallet(safeStringify(msg));
//   };
// }

/**
 * 更新或增加单个钱包
 */
export function addOrUpdateAWallet(wallet, shouldFocus = true) {
  return (dispatch, getState) => {
    const walletsList = _get(getState(), ['wallets', 'walletsList']) || [];

    // utc地址作为id
    const walletId = _get(wallet, ['coins', coins.UTC.symbol, 'address']);
    const {walletIndex} = dispatch(findWalletByAddress(walletId));

    let newWalletsList = [...walletsList];

    const walletPure = {
      ...wallet,
      id: walletId,
      name: wallet.name,
      // address: wallet.address, // to remove
      encryptedMnemonic: wallet.encryptedMnemonic,
      encryptedPrivateKey: wallet.encryptedPrivateKey,
      passwordKey: wallet.passwordKey,
      backupCompleted: !!wallet.backupCompleted, // 是否已备份
    };

    console.log(walletPure, 'wallet');

    if (walletIndex === -1) {
      // 列表中不存在该钱包 => 新增
      newWalletsList.push(walletPure);
    } else {
      // 列表中存在该钱包 => 更新, 只接受需要的属性
      newWalletsList[walletIndex] = walletPure;
    }

    // console.log(newWalletsList, 'newWalletsList');

    // 更新钱包列表
    dispatch(updateWalletsList(newWalletsList));

    // 更新当前钱包
    if (shouldFocus) {
      dispatch(updateCurrentWallet(walletId));
    }
  };
}

/**
 * 移除单个钱包
 */
export function removeAWallet(wallet) {
  return (dispatch, getState) => {
    const walletsList = _get(getState(), ['wallets', 'walletsList']) || [];
    const currentWallet = _get(getState(), ['wallets', 'currentWallet']) || {};

    let newWalletsList = [...walletsList];
    const {walletIndex} = dispatch(findWalletByAddress(wallet.id));

    if (walletIndex === -1) {
      // 列表中不存在该钱包 => 终止
      return newWalletsList;
    }
    // 列表中存在该钱包 => 删除
    newWalletsList.splice(walletIndex, 1);

    // 更新列表
    dispatch(updateWalletsList(newWalletsList));

    // 更新当前钱包
    if (newWalletsList.length > 0) {
      // 删除后还有钱包，切换到列表中第一个
      if (wallet.id === currentWallet.id) {
        // 删除的是当前钱包，切换到列表中第一个
        dispatch(updateCurrentWallet(newWalletsList[0].id));
      }
    } else {
      // 清空当前钱包
      dispatch(updateCurrentWallet());
    }
    // console.log(newWalletsList, 'newWalletsListnewWalletsListnewWalletsList')
    return newWalletsList;
  };
}

/**
 * 更新钱包列表
 */
export function updateWalletsList(walletsList) {
  return (dispatch, getState) => {
    dispatch({type: UPDATE_WALLETS, payload: {walletsList}});
  };
}

/**
 * 切换当前钱包
 * @param: {string} id - 当前钱包id
 */
export function updateCurrentWallet(id) {
  return (dispatch, getState) => {
    const {wallet} = dispatch(findWalletByAddress(id));
    dispatch({
      type: UPDATE_CURRENT_WALLET,
      payload: {currentWallet: wallet},
    });

    // 先清空资产 todo：恢复成初始模版
    dispatch({type: UPDATE_CURRENT_ASSET, payload: {assetsList: []}});

    // todo: 请求新钱包数据（多币种数据）
    if (wallet) {
      dispatch(getAssetByAddress(wallet.address));
    }
  };
}

/**
 * todo: 老版本时候不兼容
 * 根据地址从钱包列表中找钱包
 * @param: {string} address - 寻找的钱包地址
 * @description:
 *  1.3.0以下的wallet格式：
 *  {
 *    name: string,
 *    address: string,
 *    passwordKey: string,
 *    encryptedMnemonic: string,
 *    encryptedPrivateKey: string,
 *    backupCompleted: boolean,
 *  }
 *
 *  1.3.0以上的wallet格式：
 *  {
 *    name: string,
 *    id: string, // 原address
 *    passwordKey: string,
 *    encryptedMnemonic: string,
 *    encryptedPrivateKey: string,
 *    backupCompleted: boolean,
 *    coins: {
 *      UTC: {
 *        address: string,
 *        encryptedPrivateKey: string
 *      },
 *      BTC: {
 *        address: string,
 *        encryptedPrivateKey: string
 *      }
 *    }
 *  }
 */
function findWalletByAddress(id) {
  return (dispatch, getState) => {
    const walletsList = _get(getState(), ['wallets', 'walletsList']) || [];

    let newWalletsList = [...walletsList];

    const walletIndex = _findIndex(newWalletsList, o => {
      // 升级过程兼容老钱包格式
      return o.id === id || o.address === id;
    });

    return {
      walletIndex,
      wallet: walletsList[walletIndex],
    };
  };
}

/**
 * 更新临时验证助记词
 * @param: {string} tempMnemonic - 临时验证助记词
 */
export function updateTempMnemonic(tempMnemonic) {
  return (dispatch, getState) => {
    dispatch({type: UPDATE_TEMP_MNEMONIC, payload: {tempMnemonic}});
  };
}

/**
 * 备份验证临时验证助记词
 * @param: {string} mnemonicInput - 输入的助记词
 */
export function validTempMnemonic(mnemonicInput) {
  return (dispatch, getState) => {
    const currentWallet = _get(getState(), ['wallets', 'currentWallet']) || {};
    const tempMnemonic = _get(getState(), ['wallets', 'tempMnemonic']);
    // console.log(tempMnemonic, mnemonicInput, 123123);

    if (tempMnemonic === mnemonicInput) {
      // 验证成功
      // 清空临时助记词
      const newCurrentWallet = {
        ...currentWallet,
        tempMnemonic: undefined,
        backupCompleted: true,
      };

      // 更新钱包列表
      dispatch(addOrUpdateAWallet(newCurrentWallet));

      // 删除临时助记词
      dispatch(updateTempMnemonic());
      return true;
    }
    return false;
  };
}

/**
 * 验证指定钱包密码正确性
 * @param: {string} mnemonicInput - 输入的助记词
 * @param: {string} [password] - 比较基准，正确密码的一次sha256
 */
export function validPassword(passwordInput, password) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      // 若没有传入比较基准，默认和当前钱包比
      const currentWalletPassword =
        _get(getState(), ['wallets', 'currentWallet', 'passwordKey']) || {};

      const basePassword = password || currentWalletPassword;
      console.log(basePassword, 'basePassword')
      WVEvent.emitEvent(eventTypes.POST_WEB_VIEW, [
        {
          payload: {
            action: eventTypes.SHA_256,
            data: passwordInput,
          },
          callback: v => {
            // console.log(v, 'vvvvv');
            resolve(v === basePassword);
          },
        },
      ]);
    }).catch(err => {
      console.log('isValidPwd', err);
    });
  };
}

/**
 * AES解密
 * @param: {string} password - 输入的助记词
 * @param: {string} params.data - 待解密
 * @param: {string} params.password - 密码
 */
export function aesDecrypt(params) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      WVEvent.emitEvent(eventTypes.POST_WEB_VIEW, [
        {
          payload: {
            action: eventTypes.AES_DECRYPT,
            data: params.data,
            password: params.password,
          },
          callback: v => {
            resolve(v);
          },
        },
      ]);
    }).catch(err => {
      console.log('aesDecrypt', err);
    });
  };
}

/**
 * webview签名调用
 * @param: {string} params.data - 未签交易
 * @param: {string} params.privateKey - 私钥
 */
export function signTx(params) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      WVEvent.emitEvent(eventTypes.POST_WEB_VIEW, [
        {
          payload: {
            action: eventTypes.SIGN_TX,
            data: params.data,
            privateKey: params.privateKey,
          },
          callback: v => {
            resolve(v);
          },
        },
      ]);
    }).catch(err => {
      console.log('signTx', err);
    });
  };
}

/**
 * Mnemonic 有效性验证
 * @param: {string} params.mnemonic - mnemonic
 */
export function validMnemonic(mnemonic) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      WVEvent.emitEvent(eventTypes.POST_WEB_VIEW, [
        {
          payload: {
            action: eventTypes.VALID_MNEMONIC,
            mnemonic,
          },
          callback: v => {
            resolve(v);
          },
        },
      ]);
    }).catch(err => {
      console.log('validMnemonic', err);
    });
  };
}

/**
 * 恢复钱包:
 * @param: {string} params.name - mnemonic
 * @param: {string} params.mnemonic - mnemonic
 * @param: {string} params.password - password
 * @param: {object} params.coins - coins
 */
export function recoverWallet(params) {
  return (dispatch, getState) => {
    const {name, mnemonic, password} = params;
    return new Promise((resolve, reject) => {
      WVEvent.emitEvent(eventTypes.POST_WEB_VIEW, [
        {
          payload: {
            action: eventTypes.RECOVER_WALLET_FROM_MNEMONIC,
            name,
            mnemonic,
            password,
            coins,
          },
          callback: v => {
            console.log(v, 'vvvv');
            if (v) {
              dispatch(addOrUpdateAWallet(v));
              // Toast.show({data: i18n.t('importSuccess')});

              resolve(true);
            } else {
              resolve(false);
              // Toast.show({data: i18n.t('importFailed')});
            }
          },
        },
      ]);
    }).catch(err => {
      console.log('validMnemonic', err);
    });
  };
}

/**
 * 升级钱包:
 * @param: {string} params.mnemonic - mnemonic
 */
export function updateWalletVersion(wallet, password) {
  return async (dispatch, getState) => {
    // console.log('updateWalletVersion');
    const {name, encryptedMnemonic} = wallet;
    // 密码解密助记词

    const mnemonic = await dispatch(
      aesDecrypt({data: encryptedMnemonic, password}),
    );
    // console.log(mnemonic, 'mnemonic123');

    // 助记词、密码恢复钱包
    const recoverResult = await dispatch(
      recoverWallet({
        name,
        mnemonic,
        password,
        coins,
      }),
    );

    console.log(recoverResult, 'recoverResult');

    return Promise.resolve(recoverResult);
  };
}
