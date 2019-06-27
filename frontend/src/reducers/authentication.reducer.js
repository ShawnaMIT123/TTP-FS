import { userConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggedIn: false
      };
    case userConstants.PROFILE_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.PROFILE_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.PROFILE_FAILURE:
      return {};
    case userConstants.PURCHASE_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.PURCHASE_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.PURCHASE_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}
