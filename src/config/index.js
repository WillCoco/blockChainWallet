/**
 * @author: Xu Ke
 * @date: 2019/12/16 11:26 AM
 * @Description:
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import chainInfo from './chainInfo';
import dapps from './dapps';
const urls = require('./urls');
const env = require('./env');

module.exports = {
  chainInfo,
  env: env.serverEnv, // 当前服务环境
  url: urls[env.serverEnv], // urls
  urls: chainInfo.networks, // urls
  dapps,
};
