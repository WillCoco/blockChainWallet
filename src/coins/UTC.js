import _get from 'lodash/get';
import {getAddressAsset} from '../helpers/chain33';
import BaseCoin from './baseCoin';
import {upperUnit} from '../helpers/utils/numbers';
import {coins} from '../config';

class UTC extends BaseCoin {
  /**
   * 网络获取余额
   */
  async getAsset() {
    const r = (await getAddressAsset({address: this.address})) || {};

    return Promise.resolve(r && r.result);
  }

  /**
   * 获取人民币价格
   */
  getPriceCNY(asset) {
    const coinsQuantity =
      this.symbol === asset.symbol
        ? +_get(asset, ['show', 'balanceTotal'])
        : +_get(asset, 'balance');

    const balance = upperUnit(coinsQuantity, {
      pretty: false,
      scale: this.satoshiDigit,
    });

    return (balance * this.getPriceRate(asset.symbol)).toFixed(2) || '0.00';
  }
}

module.exports = UTC;
