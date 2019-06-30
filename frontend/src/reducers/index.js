import { combineReducers } from 'redux';
import { alert } from './alert.reducer';
import { authentication } from './authentication.reducer';
import { transactions } from './transactions.reducer';
import { portfolio } from './portfolio.reducer'
import { stockPrice } from './stockPrice.reducer'
import { userConstants } from '../constants';

const appReducer = combineReducers({
    alert,
    authentication,
    transactions,
    portfolio,
    stockPrice
});

const rootReducer = (state, action) => {
   if (action.type === 'USERS_LOGOUT') {
     state = undefined
   }
   return appReducer(state, action)
}

export default rootReducer;
