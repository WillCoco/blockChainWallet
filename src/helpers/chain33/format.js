/**
 * @author: Xu Ke
 * @date: 2020/1/2 11:31 AM
 * @Description: format
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import _get from 'lodash/get';
import {chainInfo} from '../../config';
import {upperUnit} from '../utils/numbers';

export function getAddressOverview(response) {
  // console.log(response, 'response');
  const result = _get(response, 'result') || {};
  return {
    ...response,
    result: {
      ...result,
      balanceFmt: upperUnit(result.balance),
      reciverFmt: upperUnit(result.reciver),
    },
  };
}

export function getAddressTokens(response) {
  const {result} = response || {};
  let {tokenAssets} = result || {};
  tokenAssets = (tokenAssets || []).map(token => ({
    reciverFmt: upperUnit(_get(token, ['account', 'reciver'])),
    balanceFmt: upperUnit(_get(token, ['account', 'balance'])),
    symbol: token.symbol,
  }));
  // console.log(tokenAssets, 'format_getAddressTokens');

  return {
    ...response,
    result: tokenAssets,
  };
}

export function getAddressAsset(response) {
  const [accountRes, tokensRes] = response || [];

  if (accountRes.error && tokensRes.error) {
    return {
      result: null,
      error: accountRes.error || tokensRes.error,
    };
  }

  const {result: accountResult} = accountRes || {};
  const {result: tokensArray} = tokensRes || [];

  // 主币种symbol
  accountResult.symbol = chainInfo.coinName;
  // console.log(
  //   {result: [accountResult, ...tokensArray]},
  //   'format_getAddressAsset',
  // );

  return {
    result: [accountResult, ...tokensArray],
  };
}
