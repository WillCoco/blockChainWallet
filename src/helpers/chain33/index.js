/**
 * @author: Xu Ke
 * @date: 2019/12/31 6:39 PM
 * @Description:
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import {url} from '../../config';
import {server, extraServer} from '../axios';
import * as format from './format';

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
export function getAddressOverview(param) {
  return server
    .post(url.basicUrl, {
      jsonrpc,
      method: 'Chain33.GetAddrOverview',
      params: [{addr: param.address}],
      id: ++callId,
    })
    .then(r => {
      const response = format.getAddressOverview(r);
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
    console.log(r, '=========')
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
    .get(`${url.serverUrl}/tokenTransferInfo`, {
      params: {
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
      // console.log(r, '111111');
      return Promise.resolve(r);
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

