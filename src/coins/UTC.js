import {getAddressAsset} from '../helpers/chain33';
import BaseCoin from './baseCoin';

class UTC extends BaseCoin {
  /**
   * 网络获取余额
   */
  async getAsset() {
    const r = (await getAddressAsset({address: this.address})) || {};

    // console.log(this, r, '22222')

    return Promise.resolve(r && r.result);
  }
}

module.exports = UTC;
