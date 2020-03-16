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
import {chainInfo, coins} from '../../config';
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
      availableFmt: upperUnit(available),
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
  tokenAssets = (tokenAssets || []).map(token => {
    const frozen = _get(token, ['account', 'frozen']) || 0;
    const available = _get(token, ['account', 'balance']) || 0;
    const balance = +available + +frozen || 0;
    return {
      balance,
      available,
      frozen,
      // reciverFmt: upperUnit(_get(token, ['account', 'reciver'])),
      balanceFmt: upperUnit(balance),
      availableFmt: upperUnit(available),
      frozenFmt: upperUnit(frozen),
      symbol: token.symbol,
      symbolURL: _get(token, ['symbolURL']),
      icon: getIcon(token.symbol),
    };
  });
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
  let {result: tokensArray} = tokensRes || [];

  // 主币种symbol
  accountResult.symbol = coins.UTC.symbol;
  accountResult.icon = getIcon(accountResult.symbol);

  // token资产添加attachSymbol
  tokensArray = tokensArray.map(token => {
    return {
      ...token,
      isToken: true,
      attachSymbol: coins.UTC.symbol,
    };
  });
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

  const list = _get(response, ['result', 'exchangeOpInfo']) || [];
  const result = list.map(d => {
    const t = _get(d, 'blocktime') * 1000;
    const date = new Date(t);
    const Y = date.getFullYear();
    const M = (date.getMonth() + 1) < 10 ? `0${(date.getMonth() + 1)}` : (date.getMonth() + 1)
    const D = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()

    const h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const m = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const s = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
    return {
      ...d,
      day: `${M}/${D}`,
      time: `${h}:${m}`,
    };
  })
  return {
    result
  };
}

/**
 * 比特币余额
 */
export function btcAssetsBalance(response, symbol) {
  console.log(response, 'responseresponse')
  const available = _get(response, ['result', 'balance']) || 0;
  const balance = _get(response, ['result', 'final_balance']) || 0;
  const frozen = balance - available || 0;
  return {
    result: {
      available,
      balance,
      frozen,
      balanceFmt: upperUnit(balance),
      availableFmt: upperUnit(available),
      frozenFmt: upperUnit(frozen),
      symbol,
      icon: null,
    },
  };
}

/**
 * 比特币UTXO
 */
export function btcUTXO(response) {
  return {
    result: _get(response, ['result', 'txrefs']),
  };
}

/**
 * 比特币 input
 */
export function btcInputs(inputs = []) {
  return inputs.map(d => ({
    txid: d.tx_hash,
    vout: d.tx_output_n || 0,
  }));
}
