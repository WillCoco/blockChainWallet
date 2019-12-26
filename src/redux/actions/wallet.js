/**
 * @author: Xu Ke
 * @date: 2019/12/19 2:57 PM
 * @Description: wallet
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import {UPDATE_WALLETS} from './actionTypes';
import _get from 'lodash/get';
import _findIndex from 'lodash/findIndex';
import {createWallet as createWalletHelper} from '../../helpers/chain33';

/**
 * 创建钱包
 */
export function createWallet(wallet) {
  return (dispatch, getState) => {
    const wallet = createWalletHelper();
    addOrUpdateAWallet(wallet);
  };
}

/**
 * 更新或增加单个钱包
 */
export function addOrUpdateAWallet(wallet) {
  return (dispatch, getState) => {
    const walletsList = _get(getState(), ['wallet', 'walletsList']) || [];

    let newWalletsList = [...walletsList];

    const walletIndex = _findIndex(
      newWalletsList,
      o => o.address === wallet.address,
    );

    if (walletIndex === -1) {
      // 列表中不存在该钱包 => 新增
      newWalletsList = newWalletsList.push(wallet);
    } else {
      // 列表中存在该钱包 => 更新
      newWalletsList[0] = wallet;
    }

    // 更新
    updateWalletsList(newWalletsList);
  };
}

/**
 * 移除单个钱包
 */
export function removeAWallet(wallet) {
  return (dispatch, getState) => {
    const walletsList = _get(getState(), ['wallet', 'walletsList']) || [];

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
    updateWalletsList(newWalletsList);
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
