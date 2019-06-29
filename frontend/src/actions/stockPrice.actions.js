import { apiConstants } from '../constants';
import { alertActions } from './';

export const stockPriceActions = {
  updateCurrentStockPrice
};

function updateCurrentStockPrice(stock) {
    return dispatch => {
        dispatch(success(stock));
    };
    function success(stock) { return { type: apiConstants.UPDATE_CURRENT_STOCK_PRICE, stock } }
}
