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
const environments = {
  development: {
    basicUrl: 'http://27.102.128.133:8801',
    serverUrl: 'http://27.102.128.133:3333/api/v1', // 额外服务
  },
  test: {
    basicUrl: 'http://27.102.128.133:8801',
    serverUrl: 'http://27.102.128.133:3333/api/v1', // 额外服务
  },
  pre: {
    basicUrl: 'http://27.102.128.133:8801',
    serverUrl: 'http://27.102.128.133:3333/api/v1', // 额外服务
  },
  production: {
    basicUrl: 'http://27.102.128.133:8801',
    serverUrl: 'http://27.102.128.133:3333/api/v1', // 额外服务
  },
};

module.exports = environments;
