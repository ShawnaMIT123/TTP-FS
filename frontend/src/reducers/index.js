import { combineReducers } from 'redux';
import { alert } from './alert.reducer';
import { authentication } from './authentication.reducer';
import { users } from './users.reducer';

const rootReducer = combineReducers({
    alert,
    authentication,
    users

});

export default rootReducer;
