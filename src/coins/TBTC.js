// import {getAddressAsset} from '../helpers/chain33';
import _get from 'lodash/get';
import BaseCoin from './baseCoin';
import {
  BTCCreateTransaction,
  getUTXO as getBTCUTXO,
  getBTCBalance,
  BTCPushTransaction,
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
   * @params p
   * @param {number} p.amount 金额
   * @param {to} p.amount 发送目的地址
   */
  createTransaction = async p => {
    const {amount, to} = p || {};

    // 调用创建
    const r = await BTCCreateTransaction({
      url: this.node.serverUrl,
      symbol: this.symbol,
      inputs: [{addresses: [this.address]}],
      outputs: [
        {addresses: [to], value: amount}, // 对方地址和数量
        // {[this.address]: upperUnit(pickedValue - amount, {pretty: false})}, // 剩余找零
      ],
    });

    // 交易对象
    const inputs = format.btcInputs(_get(r, ['result', 'tx', 'inputs']));
    const outputs = _get(r, ['result', 'tx', 'outputs']);
    const fees = _get(r, ['result', 'tx', 'fees']);

    if (!inputs || !outputs || !fees) {
      return;
    }

    return {
      result: {
        inputs,
        outputs,
        fees,
      },
    };
  };

  /**
   * 发送交易
   */
  sendTransaction = async (params, ...p) => {
    return await BTCPushTransaction(
      {
        ...params,
        url: this.node.serverUrl,
      },
      ...p,
    );
  };

}

module.exports = TBTC;
