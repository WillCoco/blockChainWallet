/**
 * @author: Xu Ke
 * @date: 2019/12/19 2:57 PM
 * @Description: app设置，跟随整个app，和登录账号无关
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import {
  UPDATE_LANGUAGE,
  UPDATE_IS_SHOW_ASSETS,
} from './actionTypes';
import _get from 'lodash/get';
import i18n from '../../helpers/i18n';

/**
 * language设置
 */
export function updateLanguage(language) {
  return (dispatch, getState) => {
    i18n.changeLanguage(language, function() {
      dispatch({type: UPDATE_LANGUAGE, payload: {language}});
    });
  };
}

/**
 * 切换资产显示/隐藏设置
 */
export function toggleIsShowAssets() {
  return (dispatch, getState) => {
    const isShowAssets = _get(getState(), ['appSetting', 'isShowAssets']);
    dispatch(updateIsShowAssets(!isShowAssets));
  };
}

/**
 * 更新资产显示/隐藏设置
 */
export function updateIsShowAssets(isShowAssets) {
  return (dispatch, getState) => {
    dispatch({type: UPDATE_IS_SHOW_ASSETS, payload: {isShowAssets}});
  };
}
