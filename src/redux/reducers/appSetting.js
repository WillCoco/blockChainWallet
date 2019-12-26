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
} from '../actions/actionTypes';
import i18n from '../../helpers/i18n';

const initialState = {
  language: i18n.language,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LANGUAGE:
      return {...state, language: action.payload.language};
    default:
      return state;
  }
}
