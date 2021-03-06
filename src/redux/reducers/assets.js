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
  UPDATE_EXCHANGE_RATE,
} from '../actions/actionTypes';

/**
 * [assetsList]
 */
const initialState = {
  assetsList: [],
  exchangeRate: {
    UTC: 0,
    TC: 7,
  },
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CURRENT_ASSET:
      return {...state, assetsList: action.payload.assetsList};
    case UPDATE_EXCHANGE_RATE:
      return {
        ...state,
        exchangeRate: {
          ...state.exchangeRate,
          ...action.payload.exchangeRate,
        },
      };
    default:
      return state;
  }
}
