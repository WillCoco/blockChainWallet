/**
 * @author: Xu Ke
 * @date: 2019/12/16 11:26 AM
 * @Description:
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
const urlsConfig = require('./urls');
const env = require('./env');

module.exports = {
  env: env.serverEnv, // 当前服务环境
  urls: urlsConfig[env.serverEnv], // urls
};
