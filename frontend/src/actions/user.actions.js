import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const userActions = {
    login,
    logout,
    signup,
    getProfile
};

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function signup(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        userService.signup(email, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function getProfile() {
    return dispatch => {
        dispatch(request());

        userService.getProfile()
            .then(
                user => dispatch(success(user)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.PROFILE_REQUEST } }
    function success(user) { return { type: userConstants.PROFILE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.PROFILE_FAILURE, error } }
}

function purchaseStock(symbol, lastSalePrice, quantity) {
    return dispatch => {
        dispatch(request());

        userService.getProfile()
            .then(
                user => dispatch(success(user)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.PURCHASE_REQUEST } }
    function success(user) { return { type: userConstants.PURCHASE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.PURCHASE_FAILURE, error } }
}
