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

    const {walletIndex} = dispatch(findWalletByAddress(wallet.address));

    let newWalletsList = [...walletsList];

    const walletPure = {
      name: wallet.name,
      address: wallet.address,
      encryptedMnemonic: wallet.encryptedMnemonic,
      encryptedPrivateKey: wallet.encryptedPrivateKey,
      passwordKey: wallet.passwordKey,
      backupCompleted: wallet.backupCompleted, // 是否已备份
    };

    if (walletIndex === -1) {
      // 列表中不存在该钱包 => 新增
      newWalletsList.push(walletPure);
    } else {
      // 列表中存在该钱包 => 更新, 只接受需要的属性
      newWalletsList[walletIndex] = walletPure;
    }

    console.log(newWalletsList, 'newWalletsList');

    // 更新钱包列表
    dispatch(updateWalletsList(newWalletsList));

    // 更新当前钱包
    if (shouldFocus) {
      dispatch(updateCurrentWallet(wallet.address));

      // 更新钱包数据

    }
  };
}

/**
 * 移除单个钱包
 */
export function removeAWallet(wallet) {
  return (dispatch, getState) => {
    // console.log(wallet, 1111)
    const walletsList = _get(getState(), ['wallets', 'walletsList']) || [];
    const currentWallet = _get(getState(), ['wallets', 'currentWallet']) || {};

    let newWalletsList = [...walletsList];
    const {walletIndex} = dispatch(findWalletByAddress(wallet.address));

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
      if (wallet.address === currentWallet.address) {
        // 删除的是当前钱包，切换到列表中第一个
        dispatch(updateCurrentWallet(newWalletsList[0].address));
      }
    } else {
      // 清空当前钱包
      dispatch(updateCurrentWallet());
    }
    console.log(newWalletsList, 'newWalletsListnewWalletsListnewWalletsList')
    return newWalletsList;
  };
}

/**
 * 更新钱包列表设置
 */
export function updateWalletsList(walletsList) {
  return (dispatch, getState) => {
    dispatch({type: UPDATE_WALLETS, payload: {walletsList}});
  };
}

/**
 * 切换当前钱包
 * @param: {string|number} currentWallet - 当前钱包序号
 */
export function updateCurrentWallet(address) {
  return (dispatch, getState) => {
    const {wallet} = dispatch(findWalletByAddress(address));
    dispatch({
      type: UPDATE_CURRENT_WALLET,
      payload: {currentWallet: wallet},
    });
    // 先清空资产
    dispatch({type: UPDATE_CURRENT_ASSET, payload: {assetsList: []}});

    // todo: 请求新钱包数据
    if (wallet && wallet.address) {
      dispatch(getAssetByAddress(wallet.address));
    }
  };
}

/**
 * 根据地址从钱包列表中找钱包
 * @param: {string} address - 寻找的钱包地址
 */
function findWalletByAddress(address) {
  return (dispatch, getState) => {
    const walletsList = _get(getState(), ['wallets', 'walletsList']) || [];

    let newWalletsList = [...walletsList];

    const walletIndex = _findIndex(newWalletsList, o => o.address === address);

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
    console.log(tempMnemonic, mnemonicInput, 123123);

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