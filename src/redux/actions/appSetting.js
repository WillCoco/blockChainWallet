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
} from './actionTypes';
import i18n from '../../helpers/i18n';

/**
 * language设置
 */
export function updateLanguage(language) {
  return (dispatch, getStore) => {
    i18n.changeLanguage(language, function() {
      dispatch({type: UPDATE_LANGUAGE, payload: {language}});
    });
  };
}
