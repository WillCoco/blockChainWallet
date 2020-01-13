/**
 * @author: Xu Ke
 * @date: 2019/12/19 3:07 PM
 * @Description: app设置reducer
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import {
  UPDATE_LANGUAGE,
  UPDATE_IS_SHOW_ASSETS,
} from '../actions/actionTypes';
// import i18n from '../../helpers/i18n';

const initialState = {
  language: 'ch',
  isShowAssets: true, // 是否显示资产值
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LANGUAGE:
      return {...state, language: action.payload.language};
    case UPDATE_IS_SHOW_ASSETS:
      return {...state, isShowAssets: action.payload.isShowAssets};
    default:
      return state;
  }
}
