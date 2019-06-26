import { apiConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';

export const portfolioActions = {
  updatePortfolioStockPrice
};

function updatePortfolioStockPrice(symbol, askPrice, bidPrice, lastSalePrice) {
    return dispatch => {
        dispatch(success({ symbol, askPrice, bidPrice, lastSalePrice }));
    };
    function success(stock) { return { type: apiConstants.UPDATE_PORTFOLIO_STOCK_PRICE, stock } }
}
