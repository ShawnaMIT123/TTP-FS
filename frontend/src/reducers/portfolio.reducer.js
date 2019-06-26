import { userConstants, apiConstants } from '../constants';

export function portfolio(state = {}, action) {
  switch (action.type) {
    case userConstants.TRANSACTIONS_MAP_REQUEST:
      return {
        loading: true
      };
    case userConstants.TRANSACTIONS_MAP_SUCCESS:
      return {
        transactions_map: action.map
      };
    case apiConstants.UPDATE_PORTFOLIO_STOCK_PRICE:
    return {
      ...state,
      transactions_map: {
        ...state.transactions_map,
        [action.stock.symbol]: {...state.transactions_map[action.stock.symbol],
          pricing: action.stock.bidPrice
        }
      }
    };
    default:
      return state
    };
}
