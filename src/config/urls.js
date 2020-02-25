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
const urls = {
  development: {
    basicUrl: 'http://114.67.92.85:8801/',
    serverUrl: 'http://114.67.92.85:3333/api/v1', // 额外服务
    website: 'https://uniontea.io', // 官网
    otcServerUrl: 'https://pre.otc.msn.best', // otc服务
  },
  testnet: {
    basicUrl: 'https://testnet.utcpark.com:8801/', //正式
    serverUrl: 'https://testnet.utcpark.com:3333/api/v1', // 额外服务
    website: 'https://uniontea.io', // 官网
    otcServerUrl: 'https://pre.otc.msn.best', // otc服务
  },
  mainnet: {
    // basicUrl: 'https://mainnet.utcpark.com/rpc',
    basicUrl: 'https://mainnet.utcpark.com:8801/',
    // serverUrl: 'https://mainnet.utcpark.com/api', // 额外服务
    serverUrl: 'https://mainnet.utcpark.com:3333/api/v1', // 额外服务
    website: 'https://uniontea.io', // 官网
    otcServerUrl: 'https://otc.msn.best', // otc服务
  },
};

module.exports = urls;
