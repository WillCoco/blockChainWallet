/**
 * @author: Xu Ke
 * @date: 2019/12/16 11:29 AM
 * @Description:
 * urls：
 *  1.basicUrl：url
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */

/**
 * 区块链服务
 */
const networks = {
  // 测试网
  testnet: {
    basicUrl: 'https://testnet.utcpark.com:8801/',
    serverUrl: 'https://testnet.utcpark.com:3333/api/v1',
  },
  // 正式网
  mainnet: {
    basicUrl: 'https://mainnet.utcpark.com:8801/', // rpc
    serverUrl: 'https://mainnet.utcpark.com:3333/api/v1', // 额外服务
  },
};

/**
 * otc服务
 */
const otcServerUrl = 'https://pre.otc.msn.best'; // utc汇率

/**
 * 官网
 */
const website = 'https://uniontea.io';

/**
 * h5 dapp
 */
const dapps = {
  test: {
    otc: {
      name: 'otc',
      url: 'http://120.79.1.142/otcweb/',
    },
  },
  prod: {
    otc: {
      name: 'otc',
      url: 'https://otcutc.com/otcWeb',
    },
  },
};

/**
 * 组合
 */
const urls = {
  // 开发
  dev: {
    basicUrl: networks.testnet.basicUrl,
    serverUrl: networks.testnet.serverUrl,
    website, // 官网
    otcServerUrl, // otc服务
    dapps: dapps.test,
  },
  // 测试
  test: {
    basicUrl: networks.testnet.basicUrl, // rpc
    serverUrl: networks.testnet.serverUrl, // 额外服务
    website, // 官网
    otcServerUrl, // otc服务
    dapps: dapps.prod,
  },
  // 生产
  prod: {
    ...networks.mainnet,
    basicUrl: networks.mainnet.basicUrl, // rpc
    serverUrl: networks.mainnet.serverUrl, // 额外服务
    website, // 官网
    otcServerUrl, // otc服务
    dapps: dapps.prod,
  },
};

module.exports = urls;
