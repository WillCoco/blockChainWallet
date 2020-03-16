// import {getAddressAsset} from '../helpers/chain33';
import _get from 'lodash/get';
import BaseCoin from './baseCoin';
import {
  BTCCreateRawTransaction,
  getUTXO as getBTCUTXO,
  getBTCBalance,
  BTCSendTransaction,
} from '../helpers/chain33';
import * as format from '../helpers/chain33/format';
import {upperUnit} from '../helpers/utils/numbers';

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
  async getUTXO() {
    // console.log(`${this.node.serverUrl}/GetUnspentTxInfo`, 1111)
    const r = await getBTCUTXO({
      addr: this.address,
      symbol: this.symbol,
      url: this.node.serverUrl,
    });

    return r && r.result;
  }

  /**
   * 选择使用的UTXO
   */
  pickUTXO(amount, UTXOList) {
    const pickedUTXOList = [];
    let pickedValue = 0;
    for (let i = 0; i < UTXOList.length; i++) {
      pickedValue += _get(UTXOList, [i, 'value']);
      pickedUTXOList.push(_get(UTXOList, i));
      if (pickedValue >= amount) {
        break;
      }
    }

    return (
      pickedValue >= amount && {
        pickedUTXOList: format.btcInputs(pickedUTXOList),
        pickedValue,
      }
    );
  }

  /**
   * 网络获取余额
   */
  async getAsset() {
    const r = await getBTCBalance({
      addr: this.address,
      symbol: this.symbol,
      url: this.node.serverUrl,
    });
    return Promise.resolve(r && r.result);
  }

  /**
   * 构造交易
   */
  createTransaction = async p => {
    const {amount, fee, to} = p || {};
    const totalAmount = amount + fee;

    // 获取utxo
    // console.log(this.getUTXO, 'this.getUTXO()');
    const UTXOList = (await this.getUTXO()) || [];

    const {
      pickedUTXOList, // 将要使用的utxo
      pickedValue, // 这些utxo总值
    } = this.pickUTXO(totalAmount, UTXOList) || {};

    if (!pickedUTXOList) {
      return;
    }

    // 调用创建
    const r = await BTCCreateRawTransaction({
      inputs: pickedUTXOList,
      outputs: [
        {[to]: upperUnit(amount, {pretty: false})}, // 对方地址和数量
        {[this.address]: upperUnit(pickedValue - amount, {pretty: false})}, // 剩余找零
      ],
    });

    return r && r.result;
  };

  /**
   * 发送交易
   */
  async sendTransaction(...p) {
    return await BTCSendTransaction(p);
  }
}

module.exports = TBTC;
