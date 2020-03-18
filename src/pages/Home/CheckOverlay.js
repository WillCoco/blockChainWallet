/**
 * @author: Xu Ke
 * @date: 2020/2/13 10:51 AM
 * @Description: 检查各类弹窗条件
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */

import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useIsFocused} from 'react-navigation-hooks';
import _get from 'lodash/get';
import {Overlay} from '../../components/Mask';
import safePage from '../../helpers/safePage';
import {vw} from '../../helpers/metric';
import i18n from '../../helpers/i18n';
import images from '../../images';
import {update} from '../../redux/actions';

const CheckOverlay = props => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  // 钱包列表
  const walletsList =
    useSelector(state => _get(state, ['wallets', 'walletsList'])) || [];

  // 当前钱包
  const currentWallet = useSelector(
    state => _get(state.wallets, ['currentWallet']) || [],
  );

  /**
   * 第一次进入app时检查需要弹出的overlay
   */
  React.useEffect(() => {
    // 检查更新
    checkVersion();

    if (isFocused && walletsList.length !== 0) {
      // 有钱包，不进入引导，检查在主页需要的弹窗

      // todo 当前钱包不含多币种的，执行一次导入升级成多币种的，（处理未备份的）
    }
  }, []);

  /**
   * 检查更新
   */
  const checkVersion = () => {
    dispatch(update.checkVersion()).then(async info => {
      // console.log(info, 'checkUpdate_home');
      if (!info) {
        return;
      }

      if (info.expired) {
        // 原生包过期
        console.log('apk过期', 'checkUpdate_111');
        Overlay.unshift(Overlay.contentTypes.UPDATER, {
          customData: {info},
        });
      } else if (info.upToDate) {
        // 您的应用版本已是最新
        console.log('您的应用版本已是最新', 'checkUpdate_222');
      } else {
        console.log('有更新', 'checkUpdate_333');
        // 这里因为是手动检查的，忽略静默属性
        if (_get(info, ['metaInfo', 'silent'])) {
          // 静默下载
          const hash = await update.doDownload(info);

          // 下次重启生效
          update.doSwitch(hash, false);
        } else {
          // 非静默下载
          Overlay.unshift(Overlay.contentTypes.UPDATER, {
            customData: {info},
          });
        }
      }
    });
  }

  return null;
};

export default props => safePage(CheckOverlay, props);
