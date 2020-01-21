/**
 * @author: Xu Ke
 * @date: 2020/1/19 5:43 PM
 * @Description:
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import {
  Platform,
} from 'react-native';
import {
  isFirstTime,
  isRolledBack,
  packageVersion,
  currentVersion,
  checkUpdate,
  downloadUpdate,
  switchVersion,
  switchVersionLater,
  markSuccess,
} from 'react-native-update';
import _updateConfig from '../../../update.json';

const {appKey} = _updateConfig[Platform.OS];

console.log(160, 'checkUpdate_version');
/**
 * 检查更新
 */
export function checkVersion() {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      if (__DEV__) {
        // 开发模式不支持热更新，跳过检查
        return;
      }

      console.log(isRolledBack, 'checkUpdate_isRolledBack');
      console.log(isFirstTime, 'checkUpdate_isFirstTime126');
      if (isFirstTime) {
        markSuccess();
        console.log(appKey, 'checkUpdate_mark');
      }

      // 检查更新
      let info;
      try {
        info = await checkUpdate(appKey);
        console.log(info, 'checkUpdate_info');
      } catch (err) {
        console.log(err, 'checkUpdate_err');
        return;
      }

      // 元信息
      let metaInfo = {
        silent: true,
      };
      try {
        metaInfo = JSON.parse(info.metaInfo);
      } catch (err) {
        console.log(err, 'checkUpdate_err');
      }

      console.log(metaInfo, 'checkUpdate_meta');

      if (info.expired) {
        // 原生包过期
        resolve(info);
        console.log('apk过期', 'checkUpdate_111');
      } else if (info.upToDate) {
        // 您的应用版本已是最新
        console.log('您的应用版本已是最新', 'checkUpdate_222');
      } else {
        console.log('有更新', 'checkUpdate_333');
        // 根据info是否静默
        if (metaInfo.silent) {
          // 静默下载
          doUpdate(info, false);
        } else {
          // 非静默下载
          resolve(info);
        }
      }
    }).catch(err => {
      console.warn('checkVersionErr:', err);
    });
  };
}

/**
 * 下载、生效时机
 */
async function doUpdate(info, switchNow) {
  const hash = await downloadUpdate(info);
  console.log(hash, 'checkUpdate_d_hash');
  switchNow ? switchVersion(hash) : switchVersionLater(hash);
}
