// import {getAddressAsset} from '../helpers/chain33';
import _get from 'lodash/get';
import BaseCoin from './baseCoin';
import {btcServer} from '../helpers/axios';

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
   * 网络获取utxo
   */
  getUTXO() {
    return btcServer.get(`${this.node.serverUrl}/GetUnspentTxInfo`, {
      params: {
        addr: '1MUz4VMYui5qY1mxUiG8BQ1Luv6tqkvaiL' || this.address,
        page: 1,
        pagesize: 100, // transfer/exchange/coins
      },
    });
    // .then(r => console.log(r, 11111));
  }

  /**
   * 选择使用的UTXO
   */
  pickUTXO(amount, UTXOList) {
    const picked = [];
    let value = 0;
    for (let i = 0; i < UTXOList.length; i++) {
      value += _get(UTXOList, [i, 'value']);
      picked.push(_get(UTXOList, i));
      if (value >= amount) {
        break;
      }
    }

    return value >= amount && picked;
  }

  /**
   * 网络获取余额
   */
  async getAsset() {
    const r = await btcServer.get(`${this.node.serverUrl}/GetUnspentTxInfo`, {});

    return Promise.resolve({
      r,
      symbol: this.symbol,
    });
  }

  /**
   * 构造交易
   */
  createTransaction(p) {
    const {amount, fee} = p || {};
    const totalAmount = amount + fee;

    // 获取utxo
    const UTXOList = [];

    // 计算使用的utxo
    const pickedUTXO = this.pickUTXO(totalAmount, UTXOList);

    if (!pickedUTXO) {
      return;
    }

    // 调用创建
    return {};
  }

  /**
   * 发送交易
   */
  sendTransaction(...p) {
    const url = this.currentNode + '';

    btcServer.get(url)
      .then(r => {
        console.log(r, 123123)
      });
    return {};
  }
}

module.exports = TBTC;
