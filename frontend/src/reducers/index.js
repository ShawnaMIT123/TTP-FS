import { combineReducers } from 'redux';
import { alert } from './alert.reducer';
import { authentication } from './authentication.reducer';
import { transactions } from './transactions.reducer';
import { portfolio } from './portfolio.reducer'
import { stockPrice } from './stockPrice.reducer'

const rootReducer = combineReducers({
    alert,
    authentication,
    transactions,
    portfolio,
    stockPrice
});

export default rootReducer;
