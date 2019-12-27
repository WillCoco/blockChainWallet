/**
 * @author: Xu Ke
 * @date: 2019/12/19 3:07 PM
 * @Description: wallets reducer
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import {
  UPDATE_CURRENT_WALLET,
  UPDATE_WALLETS,
} from '../actions/actionTypes';

/**
 * 私钥存储
 */
const initialState = {
  // walletPostMessage: undefined, // webView实例的postMessage方法
  currentWallet: undefined, // 钱包列表
  walletsList: [], // 钱包列表
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CURRENT_WALLET:
      return {...state, currentWallet: action.payload.currentWallet};
    case UPDATE_WALLETS:
      return {...state, walletsList: action.payload.walletsList};
    default:
      return state;
  }
}
