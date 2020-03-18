/**
 * @author: Xu Ke
 * @date: 2019/12/31 6:39 PM
 * @Description:
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import _get from 'lodash/get';
import {url, chainInfo, coins} from '../../config';
import {server, extraServer, btcServer} from '../axios';
import * as format from './format';
import {upperUnit} from '../utils/numbers';

let jsonrpc = '2.0';
let callId = 0;

/**
 * 获取服务时间
 */
export function getServerTime() {
  return server.post(url.basicUrl, {
    jsonrpc,
    method: 'Chain33.GetTimeStatus',
    params: [],
    id: ++callId,
  });
}

/**
 * 获取地址主币资产
 */
// export function getAddressOverview(param) {
//   return server
//     .post(url.basicUrl, {
//       jsonrpc,
//       method: 'Chain33.GetAddrOverview',
//       params: [{addr: param.address}],
//       id: ++callId,
//     })
//     .then(r => {
//       console.log(r, '获取地址主币资产')
//       const response = format.getAddressOverview(r);
//
//       return Promise.resolve(response);
//     });
// }
//
export function getAddressOverview(params) {
  return Promise.all([
    getAddressBalance({...params, execer: 'coins'}), // coins余额
    getAddressBalance({...params, execer: 'exchange'}),
  ]).then((r = []) => {
    const coinsRes = r[0] || {};
    const exchangeRes = r[1] || {};

    // exchange部分format

    // 主币显示的余额 = exchange兑换全部 + coins全部
    const balanceTotal =
      +_get(coinsRes, ['result', 'balance']) +
      +_get(exchangeRes, ['result', 'balance']);

    const balanceTotalFmt = upperUnit(balanceTotal);

    // console.log(balanceTotalFmt, balanceTotal, 'balanceTotalbalanceTotalbalanceTotal')

    const res = {
      result: {
        ...coinsRes.result,
        exchange: exchangeRes.result,
        show: {
          balanceTotal,
          balanceTotalFmt,
        },
      },
    };

    return Promise.resolve(res);
  });
}

// coins
export function getAddressBalance(param) {
  return server
    .post(url.basicUrl, {
      jsonrpc,
      method: 'Chain33.GetBalance',
      params: [
        {
          addresses: [param.address],
          execer: param.execer, // coins, exchange 取指定执行器下的钱
        },
      ],
      id: ++callId,
    })
    .then(r => {
      // console.log(r, '获取地址主币资产');
      const response = format.getAddressBalance(r);

      return Promise.resolve(response);
    });
}

/**
 * 获取地址下token资产
 */
export function getAddressTokens(param) {
  return server
    .post(url.basicUrl, {
      jsonrpc,
      method: 'Chain33.Query',
      params: [
        {
          execer: 'token',
          funcName: 'GetAccountTokenAssets',
          payload: {
            address: param.address,
            execer: 'token',
          },
        },
      ],
      id: ++callId,
    })
    .then(r => {
      // console.log(r, '获取地址下token资产')
      const response = format.getAddressTokens(r);
      return Promise.resolve(response);
    });
}

/**
 * 获取地址下主币+token资产
 */
export function getAddressAsset(params) {
  return Promise.all([
    getAddressOverview(params),
    getAddressTokens(params),
  ]).then(r => {
    const response = format.getAddressAsset(r);
    return Promise.resolve(response);
  });
}

/**
 * 构造未签名交易
 */
export function createTransaction(params) {
  console.log(params, 'paramsparamsparamsparams')
  return server
    .post(url.basicUrl, {
      jsonrpc,
      method: 'Chain33.CreateRawTransaction',
      id: ++callId,
      params: [
        {
          to: params.to,
          amount: params.amount,
          fee: params.fee,
          note: params.note,
          isToken: params.isToken,
          isWithdraw: params.isWithdraw,
          tokenSymbol: params.tokenSymbol,
          execName: params.execName,
        },
      ],
    })
    .then(r => {
      console.log(r, '====');
      return Promise.resolve(r);
    });
}

/**
 * 发送交易
 */
export function sendTransaction(params) {
  return server
    .post(url.basicUrl, {
      jsonrpc,
      method: 'Chain33.SendTransaction',
      id: ++callId,
      params: [
        {
          data: params.tx,
        },
      ],
    })
    .then(r => {
      // console.log(r, '====');
      return Promise.resolve(r);
    });
}

/**
 * 获取主币和token指定类型分页交易历史
 */
export function getHistory(params) {
  return extraServer
    .get(`${url.serverUrl}/tokenTransferInfo`, {
      params: {
        ...params,
        addr: params.address || params.addr,
        symbol: params.symbol,
        action: params.action, // transfer/exchange/coins
        status: params.status,
        executor: params.executor, // [token,coins,默认查token和icons]
        start: params.start,
        num: params.size,
      },
    })
    .then(r => {
      console.log(r, 'getHistory');
      const result = format.getHistory(r)
      return Promise.resolve(result);
    });
}
// export function getHistory(params) {
//   return extraServer
//     .get(`${url.serverUrl}/tokenTransferInfo`, {
//       params: {
//         addr: params.address,
//         symbol: params.symbol,
//         action: params.action, // transfer/collect
//         status: params.status,
//         executor: params.executor, // [token,coins,默认查token和icons]
//         start: params.start,
//         num: params.size,
//       },
//     })
//     .then(r => {
//       console.log(r, 'getHistory');
//       const result = format.getHistory(r)
//       return Promise.resolve(result);
//     });
// }

/**
 * 获取主币、指定token全部类型分页交易历史
 */
export function getAllHistory(params) {
  console.log(params, 'paramsparams');
  return extraServer
    .get(`${url.serverUrl}/allTokenTransferiInfo`, {
      params: {
        addr: params.address || params.addr,
        symbol: params.symbol,
        // status: params.status,
        // executor: params.executor,
        start: params.start,
        num: params.size,
      },
    })
    .then(r => {
      console.log(r, 'getHistory');
      const result = format.getHistory(r);
      return Promise.resolve(result);
    });
}

/**
 * 兑换主币种
 * @params:
 * @param: {string} params.amount - 兑换数量（待兑换token，非主币种）
 * @param: {number} params.opType - 1: 直接解锁, 2:分批解锁
 * @param: {number} params.recv - 发起兑换地址
 * @param: {string} params.[manager] - 公账户
 * @param: {manager} params.[symbol] - 待兑换token
 */
export function exchangeMainCoin(params) {
  const defaultParams = {
    symbol: 'TC',
    manager: chainInfo.exchangeAccount,
  };

  const finallyParams = {...defaultParams, ...params};
  console.log(finallyParams, 'finallyParams')
  return server
    .post(url.basicUrl, {
      jsonrpc,
      method: 'exchange.ExchangeOpTx',
      params: [finallyParams],
      id: ++callId,
    })
    .then(r => {
      console.log(r, 'exchangeMainCoin');
      // const response = format.getAddressTokens(r);
      return Promise.resolve(r);
    });
}

/**
 * 查询兑换历史(闪兑页面)
 * @params:
 * @param: {string} params.address - 兑换数量（待兑换token，非主币种）
 * @param: {number} params.[count] -
 * @param: {number} params.[symbol] - 币种
 */
export function getExchangeHistory(params) {
  const defaultParams = {
    count: 50,
    symbol: 'TC',
  };

  const finallyParams = {...defaultParams, ...params};
  // console.log(finallyParams, 'exchangeHistory');

  return server
    .post(url.basicUrl, {
      jsonrpc,
      method: 'Chain33.Query',
      params: [
        {
          execer: 'exchange',
          funcName: 'QueryExchangeOpInfo',
          payload: {
            address: finallyParams.address,
            count: finallyParams.count,
            symbol: finallyParams.symbol,
          },
        },
      ],
      id: ++callId,
    })
    .then(r => {
      const response = format.getExchangeHistory(r);

      // console.log(response, 'getExchangeHistory')
      return Promise.resolve(response);
    });
}

/**
 * 兑换提现
 * @params:
 */
export function exchangeWithdraw(params) {
  const defaultParams = {
    to: '1LVU7ZDQbNMBJpTraUJZYLyXsfK4FkaCqS',
    amount: 0,
    fee: 0,
    note: '',
    isToken: undefined,
    isWithdraw: true,
    tokenSymbol: '',
    execName: 'exchange',
  };

  const finallyParams = {...defaultParams, ...params};
  console.log(finallyParams, '兑换提现finallyParams');

  return server
    .post(url.basicUrl, {
      jsonrpc,
      method: 'Chain33.CreateRawTransaction',
      params: [finallyParams],
      id: ++callId,
    })
    .then(r => {
      return Promise.resolve(r || {});
    });
}

/**
 * 获取UTC汇率
 * @params:
 */
export function getUTCExchangeRate() {
  return extraServer.post(`${url.otcServerUrl}/transfer/getUtcCny`).then(r => {
    return Promise.resolve(r || {});
  });
}

/**
 * BTC getBTCBalance
 */
export function getBTCBalance(params) {
  if (!params.addr || !params.symbol || !params.url) {
    console.error('getUTXO_缺少必要参数:', params);
  }

  // console.log(params.addr, 'params.addr')
  return btcServer
    .get(`${params.url}/GetUnspentTxInfo`, {
      params: {
        addr: params.addr,
        nettype: params.symbol === coins.TBTC.symbol ? 'testnet' : 'mainnet',
      },
    })
    .then(res => {
      const r = format.btcAssetsBalance(res, params.symbol) || {};
      return Promise.resolve(r || {});
    });
}

/**
 * BTC
 */
// auth
const auth = {
  username: 'lyn',
  password: '12340987zxl',
};

/**
 * utxo
 */
export function getUTXO(params) {
  if (!params.addr || !params.symbol || !params.url) {
    console.error('getUTXO_缺少必要参数:', params);
  }
  return btcServer
    .get(`${params.url}/GetUnspentTxInfo`, {
      params: {
        addr: params.addr,
        nettype: params.symbol === coins.TBTC.symbol ? 'testnet' : 'mainnet',
      },
    })
    .then(res => {
      const r = format.btcUTXO(res) || {};
      console.log(r, 'getUTXOrrrrr');
      return Promise.resolve(r || {});
    });
}

/**
 * BTC构造交易
 */
export function BTCCreateTransaction(params) {
  const {inputs, outputs, url, symbol} = params || {};
  const finallyUrl =
    symbol === coins.TBTC.symbol
      ? `${url}/CreateNewTransaction?nettype=testnet`
      : `${url}/CreateNewTransaction?nettype=mainnet`;

  return btcServer
    .post(
      finallyUrl,
      {
        inputs,
        outputs,
      },
      {
        auth,
      },
    )
    .then(res => {
      const r = {
        ...res,
        output_index: _get(res, 'output_index') || 0,
      };
      return Promise.resolve(r || {});
    });
}

/**
 * BTC广播交易
 */
export function BTCPushTransaction(params) {
  const {symbol, url} = params;
  const finallyUrl =
    symbol === coins.TBTC.symbol
      ? `${url}/PublishNewTransaction?nettype=testnet`
      : `${url}/PublishNewTransaction?nettype=mainnet`;

  return btcServer
    .post(
      finallyUrl,
      {tx: params.tx},
      {
        auth,
      },
    )
    .then(r => {
      console.log(r, 'BTCSendTransaction');
      return Promise.resolve({
        result: _get(r, ['result', 'tx', 'hash']),
        error: _get(r, ['result', 'error']),
      });
    })
    .catch(r => {
      console.log('BTCPushTransaction err:', r);
    });
}
