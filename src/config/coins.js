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
        'https://testnet.utcpark.com',
      ],
      mainnet: [
        'https://mainnet.utcpark.com',
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
      testnet: [
        'https://rest.bitcoin.com/v2/',
      ],
      mainnet: [
        'https://rest.bitcoin.com/v2/',
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
      testnet: [
        'https://testnet.utcpark.com:8801/',
      ],
      mainnet: [
        'https://testnet.utcpark.com:8801/',
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
      testnet: [
        'https://testnet.utcpark.com:8801/',
      ],
      mainnet: [
        'https://testnet.utcpark.com:8801/',
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
      testnet: [
        'https://testnet.utcpark.com:8801/',
      ],
      mainnet: [
        'https://testnet.utcpark.com:8801/',
      ],
    },
  },
};

module.exports = coins;
