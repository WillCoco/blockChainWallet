/**
 * @author: Xu Ke
 * @date: 2020/1/2 11:31 AM
 * @Description: format
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import _get from 'lodash/get';
import {BigNumber} from 'bignumber.js';
import {chainInfo} from '../../config';
import {upperUnit, lowerUnit} from '../utils/numbers';
import images from '../../images/index';

export function getAddressOverview(response) {
  console.log(response, 'response');
  const result = _get(response, 'result') || {};
  return {
    ...response,
    result: {
      ...result,
      balance: result.balance || '0',
      balanceFmt: upperUnit(result.balance),
      reciverFmt: upperUnit(result.reciver),
    },
  };
}

// 主币种余额
export function getAddressBalance(response) {
  console.log(response, 'response111');
  const result = _get(response, ['result', '0']) || {};

  const available = result.balance || 0;
  const frozen = result.frozen || 0;
  const balance = +available + +frozen || 0;

  return {
    result: {
      balance, // 总余额
      available,
      frozen,
      balanceFmt: upperUnit(balance),
      availableFmt: upperUnit(balance),
      frozenFmt: upperUnit(frozen),
    },
  };
}

const getIcon = symbol => {
  const name = `${symbol}Icon`;
  return images[name] || images.UTCIcon;
};

export function getAddressTokens(response) {
  const {result} = response || {};
  let {tokenAssets} = result || {};
  tokenAssets = (tokenAssets || []).map(token => ({
    balance: _get(token, ['account', 'balance']),
    reciverFmt: upperUnit(_get(token, ['account', 'reciver'])),
    balanceFmt: upperUnit(_get(token, ['account', 'balance'])),
    symbol: token.symbol,
    symbolURL: _get(token, ['symbolURL']),
    icon: getIcon(token.symbol),
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
  accountResult.icon = getIcon(accountResult.symbol);
  // console.log(
  //   {result: [accountResult, ...tokensArray]},
  //   'format_getAddressAsset',
  // );

  return {
    result: [accountResult, ...tokensArray],
  };
}

export function getHistory(response) {
  // console.log(response, 'rrrr111')
  // 区分交易类型

  return response;
}

export function getExchangeHistory(response) {
  // console.log(response, 'rrrr111')

  return {
    result: _get(response, ['result', 'exchangeOpInfo']),
  };
}
