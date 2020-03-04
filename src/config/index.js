/**
 * @author: Xu Ke
 * @date: 2019/12/16 11:26 AM
 * @Description:
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
const chainInfo = require('./chainInfo');
const updateConfig = require('./updateConfig');
const urls = require('./urls');
const env = require('./env');
const coins = require('./coins');

module.exports = {
  chainInfo,
  env: env.serverEnv, // 当前服务环境
  url: urls[env.serverEnv], // urls
  urls, // urls
  updateConfig, // 更新配置
  coins, // 币种信息
};
