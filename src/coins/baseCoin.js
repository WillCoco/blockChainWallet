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

const {store} = stores;

class BaseCoin {
  /**
   * id
   */
  id;

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
   * 是否token
   */
  isToken;

  /**
   * 如是token，隶属于哪个coin
   */
  attachTo;

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

  constructor(coinInfo) {
    if (!coinInfo) {
      throw new Error('缺少币种信息');
    }

    Object.keys(coinInfo).forEach(item => {
      this[item] = coinInfo[item];
    });
  }

  /**
   * 获取节点
   * 内置节点经用户、算法加工过的
   */
  get nodes() {
    return [];
  }

  /**
   * 获取当前使用的节点
   */
  get currentNode() {
    const {getState} = store;
    const rate = _get(getState(), ['wallets', 'currentWallet']);
    return rate;
  }

  /**
   * 获取推荐手续费
   */
  get recommendFee() {
    const recommendFee = 0;
    return recommendFee || this.defaultFee;
  }

  /**
   * 获取价格汇率
   */
  get priceRate() {
    const {getState} = store;
    const rate = _get(getState(), ['assets', 'exchangeRate', this.symbol]);
    return rate;
  }

  /**
   * 获取余额
   */
  get asset() {
    const {getState} = store;
    const assetsList = _get(getState(), ['assets', 'assetsList']);

    const assets = _filter(assetsList, o => o.symbol === this.symbol);

    return _get(assets, '0');
  }

  /**
   * 获取人民币价格
   */
  get priceCNY() {
    const balance = upperUnit(_get(this.asset, 'balance'), {
      pretty: false,
      scale: this.satoshiDigit,
    });
    const CNY = (balance * this.priceRate).toFixed(2) || '0.00';

    return CNY;
  }
}

module.exports = BaseCoin;
