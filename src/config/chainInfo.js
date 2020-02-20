/**
 * @author: Xu Ke
 * @date: 2019/12/16 11:29 AM
 * @Description:
 * urls：chain
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import urls from './urls';

const chainInfo = {
  chainName: 'UTC',
  coinName: 'UTC',
  symbol: 'UTC',
  digits: 8,
  networks: urls,
  explorerUrl: 'https://www.utcpark.com',
  exchangeAccount: '1AwEALqRjxFCDNWn4M91riDgL9Dc8mHipM',
  defaultFee: '0.001',
  minTC2UTCExchangeValue: '1', // todo satoshi
};

module.exports = chainInfo;
