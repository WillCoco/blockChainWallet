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

console.log(150, 'checkUpdate_version');

/**
 * 默认下载信息
 */
const defaultMetaInfo = {
  silent: true, // 是否静默下载
  force: false, // 是否强制下载
};

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
        console.log(111)
        info = await checkUpdate(appKey);
        console.log(info, 'checkUpdate_info1');
      } catch (err) {
        console.log(err, 'checkUpdate_err');
        return;
      }

      // 元信息
      let metaInfo = defaultMetaInfo;
      try {
        metaInfo = JSON.parse(info.metaInfo);
      } catch (err) {
        console.log(err, 'checkUpdate_err');
      }

      console.log(metaInfo, 'checkUpdate_meta');

      resolve({...info, metaInfo});

      // if (info.expired) {
      //   // 原生包过期
      //   resolve({...info, metaInfo});
      //   console.log('apk过期', 'checkUpdate_111');
      // } else if (info.upToDate) {
      //   // 您的应用版本已是最新
      //   resolve({latest: true});
      //   console.log('您的应用版本已是最新', 'checkUpdate_222');
      // } else {
      //   console.log('有更新', 'checkUpdate_333');
      //   // 根据info是否静默
      //   if (metaInfo.silent) {
      //     // 静默下载
      //     doUpdate(info, false);
      //   } else {
      //     // 非静默下载
      //     resolve({...info, metaInfo});
      //   }
      // }
    }).catch(err => {
      console.warn('checkVersionErr:', err);
    });
  };
}

/**
 * 下载、生效时机
 */
export async function doUpdate(info, switchNow) {
  let hash;
  try {
    hash = await downloadUpdate(info);
  } catch (error) {
    console.warn('downloadUpdate err:', error);
  }
  console.log(hash, 'checkUpdate_d_hash');
  if (!hash) {
    return {err: 'no hash'};
  }
  switchNow ? switchVersion(hash) : switchVersionLater(hash);
}
