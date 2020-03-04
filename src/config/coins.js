/**
 * @author: Xu Ke
 * @date: 2020/3/3 4:54 PM
 * @Description:
 *  支持的主币
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */

const coins = {
  UTC: {
    symbol: 'UTC',
    name: 'UTC',
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
  BTC: {
    symbol: 'UTC',
    name: 'UTC',
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
  ETH: {
    symbol: 'UTC',
    name: 'UTC',
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
