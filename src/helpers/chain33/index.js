/**
 * @author: Xu Ke
 * @date: 2019/12/31 6:39 PM
 * @Description:
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import _get from 'lodash/get';
import {url, chainInfo} from '../../config';
import {server, extraServer} from '../axios';
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

    // 主币显示的余额 = exchange兑换全部 + coins全部
    const balanceTotal =
      +_get(coinsRes, ['result', 'balance']) +
      +_get(exchangeRes, ['result', 'balance']);

    const balanceTotalFmt = upperUnit(balanceTotal);

    // console.log(balanceTotalFmt, balanceTotal, 'balanceTotalbalanceTotalbalanceTotal')

    const res = {
      result: {
        ...coinsRes.result,
        exchange: {
          ...exchangeRes.result,
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
      console.log(r, '获取地址主币资产');
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
      console.log(r, '获取地址下token资产')
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
    console.log(r, 'getAddressAsset');
    return Promise.resolve(response);
  });
}

/**
 * 构造未签名交易
 */
export function createTransaction(params) {
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
 * 获取指定token分页token
 */
export function getHistory(params) {
  return extraServer
    .get(`http://114.67.92.85:3333/api/v1/tokenTransferInfo`, {
      params: {
        ...params,
        addr: params.address,
        symbol: params.symbol,
        action: params.action, // transfer/collect
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
    count: 20,
    symbol: 'TC',
  };

  const finallyParams = {...defaultParams, ...params};
  console.log(finallyParams, 'exchangeHistory');

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
      console.log(r, 'exchangeMainCoin');
      const response = format.getExchangeHistory(r);

      console.log(response, 'responsssssss')
      return Promise.resolve(response);
    });
}

// getHistory({
//   address: '11',
//   symbol: 'TC',
//   start: 0,
//   size: 10,
//   action: 'transfer',
//   status: 'ExecOk',
// })
