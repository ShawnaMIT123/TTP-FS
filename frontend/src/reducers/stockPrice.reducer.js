import { apiConstants } from '../constants';

export function stockPrice(state = {}, action) {
  switch (action.type) {
    case apiConstants.UPDATE_CURRENT_STOCK_PRICE:
      return {
        stock: action.stock
      };
    default:
      return state
  }
}
