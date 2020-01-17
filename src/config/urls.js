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
    basicUrl: 'https://27.102.128.133:8801',
    serverUrl: 'https://27.102.128.133:3333/api/v1', // 额外服务
    website: 'https//www.utcpark.com', // 官网
  },
  test: {
    basicUrl: 'https://testnet.utcpark.com/rpc/', //正式
    serverUrl: 'https://testnet.utcpark.com/api', // 额外服务
    website: 'https//www.utcpark.com', // 官网
  },
  production: {
    basicUrl: 'https://mainnet.utcpark.com/rpc',
    serverUrl: 'https://mainnet.utcpark.com/api', // 额外服务
    website: 'https//www.utcpark.com', // 官网
  },
};

module.exports = urls;
