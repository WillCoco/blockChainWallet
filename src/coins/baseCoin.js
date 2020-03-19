/**
 * @author: Xu Ke
 * @date: 2020/3/3 6:35 PM
 * @Description: 基础币种模型
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import _get from 'lodash/get';
import _filter from 'lodash/filter';
import stores from '../redux/store';
import {upperUnit} from '../helpers/utils/numbers';
import bip44Constants from './bip44Constants';
import {
  createTransaction,
  sendTransaction,
  getBTCHistories,
} from '../helpers/chain33';
import {WVEvent, eventTypes} from '../helpers/eventEmmiter';

const {store} = stores;

class BaseCoin {
  /**
   * id
   */
  id;

  /**
   * bip44Constants
   */
  bip44Constants;

  /**
   * name
   */
  name;

  /**
   * symbol
   */
  symbol;

  /**
   * 币种logo
   */
  icon;

  /**
   * 排序
   */
  order;

  /**
   * 浏览器地址
   */
  explorerUrl;

  /**
   * 测试网浏览器地址
   */
  explorerTestUrl;

  /**
   * 最多小数位
   */
  satoshiDigit;

  /**
   * 展示小数位
   */
  showDigit;

  /**
   * 默认手续费
   */
  defaultFee;

  /**
   * 是否支持交易备注
   */
  canTxNote;

  constructor(coinInfo) {
    if (!coinInfo) {
      throw new Error('缺少币种信息');
    }

    Object.keys(coinInfo).forEach(item => {
      this[item] = coinInfo[item];
    });

    this.bip44Constants = bip44Constants[coinInfo.symbol];
  }

  /**
   * 获取当前钱包该币种地址
   */
  get address() {
    const {getState} = store;
    return _get(getState(), [
      'wallets',
      'currentWallet',
      'coins',
      this.symbol,
      'address',
    ]);
  }

  /**
   * 资产对象是否属于该币种活着该币种下的token
   */
  static isHomogeneous(asset, symbol) {
    return (
      _get(asset, 'symbol') === symbol || _get(asset, 'attachSymbol') === symbol
    );
  }

  /**
   * 获取节点
   * 内置节点经用户、算法加工过的
   */
  nodes;

  /**
   * 获取当前使用的节点
   */
  get testNode() {
    return this.nodes.testnet[0];
  }

  get node() {
    return this.nodes.mainnet[0];
  }

  /**
   * 获取推荐手续费
   */
  get recommendFee() {
    const recommendFee = 0;
    return recommendFee || this.defaultFee;
  }

  /**
   * 过滤余额
   */
  get asset() {
    const {getState} = store;
    const assetsList = _get(getState(), ['assets', 'assetsList']);

    const assets = _filter(assetsList, o => o.symbol === this.symbol);

    return _get(assets, '0');
  }

  /**
   * 网络获取余额
   */
  getAsset() {
    return Promise.resolve([
      {
        balance: undefined,
        balanceFmt: undefined,
        frozen: undefined,
        frozenFmt: undefined,
        symbol: this.symbol,
      },
    ]);
  }

  /**
   * 创建交易
   */
  createTransaction(...p) {
    return createTransaction(...p);
  }

  /**
   * 签名
   */
  sign(params) {
    return new Promise((resolve, reject) => {
      WVEvent.emitEvent(eventTypes.POST_WEB_VIEW, [
        {
          payload: {
            action: eventTypes.SIGN_TX,
            data: params.data,
            privateKey: params.privateKey,
            symbol: params.symbol,
          },
          callback: v => {
            resolve(v);
          },
        },
      ]);
    }).catch(err => {
      console.log('signTx', err);
    });
  }

  /**
   * 发送交易
   */
  sendTransaction(...p) {
    return sendTransaction(...p);
  }

  /**
   * 获取某个资产价格汇率
   */
  getPriceRate(symbol = this.symbol) {
    const {getState} = store;
    const rate = _get(getState(), ['assets', 'exchangeRate', symbol]);
    return rate || 0;
  }

  /**
   * 获取账户该币种以及token的人民币价值方法
   */
  getPriceCNY(asset) {
    const defaultValue = '0.00';
    if (!asset) {
      return defaultValue;
    }
    const balance = upperUnit(_get(asset, 'balance'), {
      pretty: false,
      scale: this.satoshiDigit,
    });
    return balance * this.getPriceRate(asset.symbol).toFixed(2) || defaultValue;
  }

  /**
   * 获取账户历史账单
   */
  getHistories() {
    return Promise.resolve({
      result: [],
    });
  }
}

module.exports = BaseCoin;
