/**
 * @author: Xu Ke
 * @date: 2020/3/3 4:51 PM
 * @Description: 币种模型
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import {coins as coinsInfo} from '../config';
import UTC from './UTC';
import TBTC from './TBTC';
import BTC from './BTC';
import BCH from './BCH';
import BSV from './BSV';

const coins = {
  UTC: new UTC(coinsInfo.UTC),
  BTC: new BTC(coinsInfo.BTC),
  TBTC: new TBTC(coinsInfo.TBTC),
  BCH: new BCH(coinsInfo.BCH),
  BSV: new BSV(coinsInfo.BSV),
};

setTimeout(async () => {
  // console.log(await coins.TBTC.createTransaction(), 222);
}, 4000);

module.exports = coins;
