import { apiConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';

export const portfolioActions = {
  updatePortfolioStockPrice,
  getOpeningPrice
};

function updatePortfolioStockPrice(symbol, pricing) {
    return dispatch => {
        dispatch(success(symbol, pricing));
    };
    function success(symbol, pricing) { return { type: apiConstants.UPDATE_PORTFOLIO_STOCK_PRICE, symbol, pricing } }
}

function getOpeningPrice(symbol) {
    return dispatch => {
        dispatch(request(symbol));

        userService.getOpeningPrice(symbol)
            .then(
              ohlc => dispatch(success(symbol, ohlc)),
              error => dispatch(failure(error))
            );
    };

    function request(symbol) { return { type: apiConstants.OPENING_PRICE_REQUEST, symbol } }
    function success(symbol, ohlc) { return { type: apiConstants.OPENING_PRICE_SUCCESS, symbol, ohlc } }
    function failure(error) { return { type: apiConstants.OPENING_PRICE_FAILURE, error } }
}
