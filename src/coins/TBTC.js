import {getAddressAsset} from '../helpers/chain33';
import BaseCoin from './baseCoin';
import {server} from '../helpers/axios';

class TBTC extends BaseCoin {
  /**
   * 网络获取余额
   */
  // async getAsset() {
  //   return Promise.resolve([{
  //     symbol:
  //   }]);
  // }

  /**
   * 发送交易
   */
  sendTransaction(...p) {
    const url = this.currentNode + '';

    console.log(url, 1919)
    server.get(url)
      .then(r => {
        console.log(r, 123123)
      });

    return {};
  }
}

module.exports = TBTC;
