/**
 * @author: Xu Ke
 * @date: 2019/12/19 3:07 PM
 * @Description: tokens reducer
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import {
  UPDATE_CURRENT_ASSET,
} from '../actions/actionTypes';

/**
 * [assetsList]
 */
const initialState = {
  assetsList: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CURRENT_ASSET:
      return {...state, assetsList: action.payload.assetsList};
    default:
      return state;
  }
}
