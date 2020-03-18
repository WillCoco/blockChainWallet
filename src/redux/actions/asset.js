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
  UPDATE_EXCHANGE_RATE,
} from './actionTypes';
import _get from 'lodash/get';
import _flatten from 'lodash/flatten';
import _findIndex from 'lodash/findIndex';
import {safeStringify} from '../../helpers/utils/safetyFn';
import {
  getAddressTokens,
  getAddressOverview,
  getAddressAsset,
  createTransaction,
  sendTransaction,
  getUTCExchangeRate,
} from '../../helpers/chain33';
import coinModals from '../../coins';
import {coins as coinsInfo} from '../../config';

// /**
//  * 获取钱包主币和tokens资产
//  * @param: {string} [address] - 查询地址，默认当前钱包
//  */
// export function getAssetByAddress(address) {
//   return async (dispatch, getState) => {
//     const finallyAddress =
//       address || _get(getState(), ['wallets', 'currentWallet', 'address']);
//
//     if (!finallyAddress) {
//       console.log('getAssetByAddress, 无当前地址');
//       return;
//     }
//
//     const r = (await getAddressAsset({address: finallyAddress})) || {};
//
//     dispatch({
//       type: UPDATE_CURRENT_ASSET,
//       payload: {assetsList: r.result || []},
//     });
//
//     return r;
//   };
// }

/**
 * 获取钱包主币和tokens资产
 * @param: {object} [wallet] - 查询钱包，默认当前钱包
 */
export function getAssetByAddress(wallet) {
  return async (dispatch, getState) => {
    // const finallyWallet =
    //   wallet || _get(getState(), ['wallets', 'currentWallet']);
    //
    // if (!finallyWallet) {
    //   console.log('getAssetByAddress, 未选择钱包');
    //   return;
    // }

    // const {coins} = finallyWallet;
    const coinKeys = Object.keys(coinsInfo);

    // console.log(coinKeys, 'coinKeyscoinKeyscoinKeys');

    // 所有币种资产数据请求 todo: 第一次升级，本地账户没有·coins·字段
    const result = await Promise.all(
      coinKeys.map(coinKey => coinModals[coinKey].getAsset()),
    );

    const assetsList = _flatten(result) || [];

    // console.log(assetsList, 'resultttttttttttt');

    dispatch({
      type: UPDATE_CURRENT_ASSET,
      payload: {assetsList: assetsList},
    });

    return assetsList;
  };
}

/**
 * 获取钱包主币和tokens资产
 * @param: {string} mnemonicInput - 输入的助记词
 */
export function getTxHistory(address) {
  return async (dispatch, getState) => {
    const r = (await getAddressAsset({address})) || {};
    // console.log(r, 123123)

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

/**
 * 更新资产汇率
 */
export function updateExchangeRate(exchangeRate) {
  return async (dispatch, getState) => {
    const r = (await getUTCExchangeRate({})) || {};

    const utcRate = +_get(r, ['result', 'data']);
    const fixedUtcRate = +utcRate.toFixed(2) || 0;
    // console.log('updateExchangeRate', r);
    dispatch({
      type: UPDATE_EXCHANGE_RATE,
      payload: {exchangeRate: {UTC: fixedUtcRate}},
    });
  };
}
