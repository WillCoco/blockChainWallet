/**
 * @author: Xu Ke
 * @date: 2020/1/2 11:08 AM
 * @Description: 资产
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import {
  UPDATE_CURRENT_ASSET,
} from './actionTypes';
import _get from 'lodash/get';
import _findIndex from 'lodash/findIndex';
import {safeStringify} from '../../helpers/utils/safetyFn';
import {
  getAddressTokens,
  getAddressOverview,
  getAddressAsset,
  createTransaction,
  sendTransaction,
} from '../../helpers/chain33';
import stores from '../../redux/store';

const {store} = stores;

/**
 * 获取钱包主币和tokens资产
 * @param: {string} [address] - 查询地址，默认当前钱包
 */
export function getAssetByAddress(address) {
  return async (dispatch, getState) => {
    const finallyAddress =
      address || _get(getState(), ['wallets', 'currentWallet', 'address']);

    const r = (await getAddressAsset({address: finallyAddress})) || {};

    dispatch({
      type: UPDATE_CURRENT_ASSET,
      payload: {assetsList: r.result || []}
    });

    return r;
  };
}

/**
 * 获取钱包主币和tokens资产
 * @param: {string} mnemonicInput - 输入的助记词
 */
export function getTxHistory(address) {
  return async (dispatch, getState) => {
    const r = (await getAddressAsset({address})) || {};
    console.log(r, 123123)

    if (r.result) {
      dispatch({type: UPDATE_CURRENT_ASSET, payload: {assetsList: r.result}});
    }
  };
}

/**
 * 构造交易
 * @param:
 */
export function createTx(params) {
  return async (dispatch, getState) => {
    const finallyParams = {
      to: params.to,
      amount: params.amount,
      fee: params.fee,
      note: params.note,
      isToken: params.isToken,
      isWithdraw: params.isWithdraw,
      tokenSymbol: params.tokenSymbol,
      execName: params.execName,
    };

    const r = (await createTransaction(finallyParams)) || {};
    console.log(r, 22222);

    if (r.result) {
      dispatch({type: UPDATE_CURRENT_ASSET, payload: {assetsList: r.result}});
    }
  };
}

/**
 * 根据symbol从tokens中找token
 * @param: {string} address - 寻找的钱包地址
 */
function findAssetBySymbol(tokenSymbol) {
  return async (dispatch, getState) => {
    const assetsList = _get(getState(), ['assets', 'assetsList']) || [];

    let newAssetsList = [...assetsList];

    const assetIndex = _findIndex(newAssetsList, o => o.symbol === tokenSymbol);

    return {
      assetIndex,
      asset: newAssetsList[assetIndex],
    };
  };
}

// store.dispatch(getAssetByAddress('14KEKbYtKKQm4wMthSK9J4La4nAiidGozt'));
