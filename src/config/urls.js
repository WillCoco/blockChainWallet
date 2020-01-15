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
    website: 'https://www.utcpark.io', // 官网
  },
  test: {
    basicUrl: 'https://114.67.92.85:8801', //正式
    serverUrl: 'https://114.67.92.85:3333/api/v1', // 额外服务
    website: 'https://www.utcpark.io', // 官网
  },
  pre: {
    basicUrl: 'https://27.102.128.133:8801',
    serverUrl: 'https://27.102.128.133:3333/api/v1', // 额外服务
    website: 'https://www.utcpark.io', // 官网
  },
  production: {
    basicUrl: 'https://27.102.128.133:8801',
    serverUrl: 'https://27.102.128.133:3333/api/v1', // 额外服务
    website: 'https://www.utcpark.io', // 官网
  },
};

module.exports = urls;
