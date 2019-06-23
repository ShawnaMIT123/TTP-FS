import { userConstants } from '../constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETPROFILE_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETPROFILE_SUCCESS:
      return {
        items: action.users
      };
    case userConstants.GETPROFILE_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}
