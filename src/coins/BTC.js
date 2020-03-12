import {getAddressAsset} from '../helpers/chain33';
import BaseCoin from './baseCoin';

class BTC extends BaseCoin {
  /**
   * 网络获取utxo
   */
  async getUTXO() {
  }

  /**
   * 网络获取余额
   */
  // async getAsset() {
  //   return Promise.resolve([{
  //     symbol:111
  //   }]);
  // }


}

module.exports = BTC;
