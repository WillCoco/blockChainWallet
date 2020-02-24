/**
 * @author: Xu Ke
 * @date: 2020/2/24 1:23 PM
 * @Description:
 *  热更配置：
 *    setEnv时根据此配置写入react-native-update所需的update.json
 *    在react-native-update应用信息变更时需更新此处信息
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */

const updateConfig = {
  test: {
    account: {
      id: 23135,
      name: 'utc-test',
    },
    android: {
      appId: 22214,
      appKey: 'knvoUnIZH44R5wJPNRVtipnXVIcbEr3S',
    },
    ios: {
      appId: 22216,
      appKey: 'WcwoT1WZlF4KJMZ-_enaaBpV5BxOZD7n',
    },
  },
  production: {
    account: {
      id: 22964,
      name: 'hicks',
    },
    android: {
      appId: 22047,
      appKey: '3t0BOalduK5fVOLx5rqkayn4Zt-NKJNV',
    },
    ios: {
      appId: 22085,
      appKey: 'gK0uN0bZ-zxSeh76eeqZN560ba-4ZN7h',
    },
  },
};

module.exports = updateConfig;
