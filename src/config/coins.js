/**
 * @author: Xu Ke
 * @date: 2020/3/3 4:54 PM
 * @Description:
 *  支持的主币
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
const bip44Constants = {
  UTC: 0x80003333,
  BTY: 0x80003333,
  BTC: 0x80000000,
  TBTC: 0x80000001,
  BCH: 0x80000091,
  BSV: 0x800000ec,
};

const testBasicUrl = 'https://testnet.utcpark.com:8801/';
const testServerUrl = 'https://testnet.utcpark.com:3333/api/v1';

const prodBasicUrl = 'https://mainnet.utcpark.com:8801/'; // rpc
const prodServerUrl = 'https://mainnet.utcpark.com:3333/api/v1'; // 额外服务

const coins = {
  UTC: {
    symbol: 'UTC',
    name: 'UTC',
    logo: null,
    bip44Constant: bip44Constants.BTY,
    order: 1,
    satoshiDigit: 8, // 最多小数位
    showDigit: 8, // 展示小数位
    defaultFee: 100000,
    explorerUrl: 'https://www.utcpark.com',
    explorerTestUrl: 'https://www.utcpark.com',
    exchangeAccount: '1AwEALqRjxFCDNWn4M91riDgL9Dc8mHipM',
    minTC2UTCExchangeValue: '1',
    // 内置节点
    nodes: {
      testnet: [
        {
          basicUrl: testBasicUrl,
          serverUrl: testServerUrl,
        },
      ],
      mainnet: [
        {
          basicUrl: prodBasicUrl,
          serverUrl: prodServerUrl,
        },
      ],
    },
  },
  TBTC: {
    symbol: 'TBTC',
    name: 'TBTC',
    bip44Constant: bip44Constants.TBTC,
    order: 0,
    satoshiDigit: 8,
    showDigit: 8,
    defaultFee: 400,
    explorerUrl: 'https://www.utcpark.com',
    explorerTestUrl: 'https://www.utcpark.com',
    // 内置节点
    nodes: {
      mainnet: [
        {
          basicUrl: testBasicUrl,
          serverUrl: testServerUrl,
        },
      ],
    },
  },
  BTC: {
    symbol: 'BTC',
    name: 'BTC',
    bip44Constant: bip44Constants.BTC,
    order: 2,
    satoshiDigit: 8,
    showDigit: 8,
    defaultFee: 400,
    explorerUrl: 'https://www.utcpark.com',
    explorerTestUrl: 'https://www.utcpark.com',
    // 内置节点
    nodes: {
      mainnet: [
        {
          basicUrl: prodBasicUrl,
          serverUrl: prodServerUrl,
        },
      ],
    },
  },
  BSV: {
    symbol: 'BSV',
    name: 'BSV',
    bip44Constant: bip44Constants.BSV,
    order: 3,
    satoshiDigit: 18,
    showDigit: 8,
    defaultFee: 1000000,
    explorerUrl: 'https://www.utcpark.com',
    explorerTestUrl: 'https://www.utcpark.com',
    // 内置节点
    nodes: {
      mainnet: [
        {
          basicUrl: prodBasicUrl,
          serverUrl: prodServerUrl,
        },
      ],
    },
  },
  BCH: {
    symbol: 'BCH',
    name: 'BCH',
    bip44Constant: bip44Constants.BCH,
    order: 4,
    satoshiDigit: 8,
    showDigit: 8,
    defaultFee: 400,
    explorerUrl: 'https://www.utcpark.com',
    explorerTestUrl: 'https://www.utcpark.com',
    // 内置节点
    nodes: {
      mainnet: [
        {
          basicUrl: prodBasicUrl,
          serverUrl: prodServerUrl,
        },
      ],
    },
  },
};

module.exports = coins;
