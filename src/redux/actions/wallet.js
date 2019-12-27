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
  UPDATE_WALLET_POST_MESSAGE,
} from './actionTypes';
import _get from 'lodash/get';
import _findIndex from 'lodash/findIndex';
import {safeStringify} from '../../utils/safetyFn';

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
 * 创建钱包
 */
// export function createWallet(walletInfo) {
//   return (dispatch, getState) => {
//     return new Promise((resolve, reject) => {
//       // 发送事件
//       const postWallet = _get(getState().wallets, ['walletPostMessage']);
//       postWallet(JSON.stringify({...walletInfo, action: 'CREATE_WALLET'}));
//
//       // const wallet = createWalletHelper();
//       // addOrUpdateAWallet(wallet);
//     });
//   };
// }

/**
 * 更新或增加单个钱包
 */
export function addOrUpdateAWallet(wallet) {
  return (dispatch, getState) => {
    const walletsList = _get(getState(), ['wallets', 'walletsList']) || [];

    let newWalletsList = [...walletsList];

    const walletIndex = _findIndex(
      newWalletsList,
      o => o.address === wallet.address,
    );

    if (walletIndex === -1) {
      // 列表中不存在该钱包 => 新增
      newWalletsList.push(wallet);
    } else {
      // 列表中存在该钱包 => 更新
      newWalletsList[walletIndex] = wallet;
    }

    console.log(newWalletsList, 'newWalletsList');

    // 更新钱包列表
    dispatch(updateWalletsList(newWalletsList));
  };
}

/**
 * 移除单个钱包
 */
export function removeAWallet(wallet) {
  return (dispatch, getState) => {
    const walletsList = _get(getState(), ['wallets', 'walletsList']) || [];

    let newWalletsList = [...walletsList];

    const walletIndex = _findIndex(
      newWalletsList,
      o => o.address === wallet.address,
    );

    if (walletIndex === -1) {
      // 列表中不存在该钱包 => 终止
      return;
    }

    // 列表中存在该钱包 => 删除
    newWalletsList.splice(walletIndex);

    // 更新
    dispatch(updateWalletsList(newWalletsList));
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
