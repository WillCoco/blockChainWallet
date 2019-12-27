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
 * 更新或增加单个钱包
 */
export function addOrUpdateAWallet(wallet) {
  return (dispatch, getState) => {
    const walletsList = _get(getState(), ['wallets', 'walletsList']) || [];

    const {walletIndex} = dispatch(findWalletByAddress(wallet.address));

    let newWalletsList = [...walletsList];

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

    // 更新当前钱包
    dispatch(updateCurrentWallet(wallet.address));
  };
}

/**
 * 移除单个钱包
 */
export function removeAWallet(wallet) {
  return (dispatch, getState) => {
    const walletsList = _get(getState(), ['wallets', 'walletsList']) || [];

    let newWalletsList = [...walletsList];

    const {walletIndex} = dispatch(findWalletByAddress(wallet.address));

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

    // todo: 请求新钱包数据
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
