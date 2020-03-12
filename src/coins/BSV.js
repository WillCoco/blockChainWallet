import {getAddressAsset} from '../helpers/chain33';
import BaseCoin from './baseCoin';

class UTC extends BaseCoin {
  /**
   * 网络获取余额
   */
  async getAsset() {
    const r = (await getAddressAsset({address: this.address})) || {};

    return Promise.resolve(r);
  }
}

module.exports = UTC;
