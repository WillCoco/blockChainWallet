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
    basicUrl: 'http://27.102.128.133:8801',
    serverUrl: 'http://27.102.128.133:3333/api/v1', // 额外服务
    website: 'http://www.baidu.com', // 官网
  },
  test: {
    basicUrl: 'http://114.67.92.85:8801', //正式
    serverUrl: 'http://114.67.92.85:3333/api/v1', // 额外服务
    website: 'http://www.baidu.com',
  },
  pre: {
    basicUrl: 'http://27.102.128.133:8801',
    serverUrl: 'http://27.102.128.133:3333/api/v1', // 额外服务
    website: 'http://www.baidu.com',
  },
  production: {
    basicUrl: 'http://27.102.128.133:8801',
    serverUrl: 'http://27.102.128.133:3333/api/v1', // 额外服务
    website: 'http://www.baidu.com',
  },
};

module.exports = urls;
