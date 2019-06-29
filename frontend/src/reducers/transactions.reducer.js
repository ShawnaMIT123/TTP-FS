import { userConstants } from '../constants';

export function transactions(state = {}, action) {
  switch (action.type) {
    case userConstants.TRANSACTIONS_REQUEST:
      return {
        loading: true
      };
    case userConstants.TRANSACTIONS_SUCCESS:
      return {
        transactions: action.transactions
      };
    case userConstants.ADD_TRANSACTIONS_SUCCESS:
      return {
        transactions: [...state.transactions, action.transaction ]
      };
    case userConstants.TRANSACTIONS_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}
