/**
 * @author: Xu Ke
 * @date: 2020/3/3 4:51 PM
 * @Description: 币种模型
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import {coins as coinsInfo} from '../config';
import BaseCoin from './baseCoin';

const coins = {};
Object.keys(coinsInfo).forEach(coinSymbol => {
  console.log(coinsInfo[coinSymbol], 'coinsInfo[coinSymbol]')
  coins[coinSymbol] = new BaseCoin(coinsInfo[coinSymbol]);
});

setInterval(() => {
  console.log(coins.UTC, 'coin1');
  // console.log(coins.UTC.asset, 'asset');
  // console.log(coins.UTC.priceCNY, 'asset');
  // console.log(coins.UTC.symbol, 'symbol');
}, 4000)


module.exports = BaseCoin;
