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
        [action.symbol]: {...state.transactions_map[action.symbol],
          pricing: action.pricing
        }
      }
    };
    case apiConstants.OPENING_PRICE_SUCCESS:
    return {
      ...state,
      transactions_map: {
        ...state.transactions_map,
        [action.symbol]: {...state.transactions_map[action.symbol],
          ohlc: action.ohlc
        }
      }
    };
    case userConstants.UPDATE_TRANSACTIONS_MAP:
    return {
      ...state,
      transactions_map: {
        ...state.transactions_map,
        [action.symbol]: {...state.transactions_map[action.symbol],
          quantity: action.quantity
        }
      }
    };
    default:
      return state
    };
}
