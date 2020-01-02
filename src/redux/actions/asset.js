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
import {safeStringify} from '../../utils/safetyFn';
import {
  getAddressTokens,
  getAddressOverview,
  getAddressAsset,
} from '../../helpers/chain33';
import stores from '../../redux/store';

const {store} = stores;

/**
 * 获取钱包主币和tokens资产
 * @param: {string} mnemonicInput - 输入的助记词
 */
export function getAssetByAddress(address) {
  return async (dispatch, getState) => {
    const r = (await getAddressAsset({address})) || {};
    console.log(r, 123123)

    if (r.result) {
      dispatch({type: UPDATE_CURRENT_ASSET, payload: {assetsList: r.result}});
    }
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

store.dispatch(getAssetByAddress('14KEKbYtKKQm4wMthSK9J4La4nAiidGozt'));
