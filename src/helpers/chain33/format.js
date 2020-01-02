/**
 * @author: Xu Ke
 * @date: 2020/1/2 11:31 AM
 * @Description: format
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import {chainInfo} from '../../config';

export function getAddressOverview(response) {
  return response;
}

export function getAddressTokens(response) {
  const {result} = response || {};
  let {tokenAssets} = result || [];
  console.log(result, 'rrrrr')
  tokenAssets = tokenAssets.map(token => ({
    ...token.account,
    symbol: token.symbol,
  }));

  return {
    ...response,
    result: tokenAssets,
  };
}

export function getAddressAsset(response) {
  const [accountRes, tokensRes] = response || [];

  if (accountRes.error || tokensRes.error) {
    return {
      result: null,
      error: accountRes.error || tokensRes.error,
    };
  }

  const {result: accountResult} = accountRes || {};
  const {result: tokensArray} = tokensRes || [];

  // 主币种symbol
  accountResult.symbol = chainInfo.coinName;

  return {
    result: [accountResult, ...tokensArray],
  };
}
