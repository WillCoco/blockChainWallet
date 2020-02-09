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
    basicUrl: 'https://mainnet.utcpark.com:8801',
    serverUrl: 'https://mainnet.utcpark.com:3333/api/v1', // 额外服务
    website: 'https://www.uniontea.io', // 官网
  },
  test: {
    basicUrl: 'https://testnet.utcpark.com:8801/', //正式
    serverUrl: 'https://testnet.utcpark.com:3333/api/v1', // 额外服务
    website: 'https://www.uniontea.io', // 官网
  },
  production: {
    // basicUrl: 'https://mainnet.utcpark.com/rpc',
    basicUrl: 'https://mainnet.utcpark.com:8801/',
    // serverUrl: 'https://mainnet.utcpark.com/api', // 额外服务
    serverUrl: 'https://mainnet.utcpark.com:3333/api/v1', // 额外服务
    website: 'https://www.uniontea.io', // 官网
  },
};

module.exports = urls;
