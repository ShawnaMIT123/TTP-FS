import { authHeader } from '../helpers/index';
import { apiUrl, iexapiUrl } from '../constants';

export const userService = {
    login,
    logout,
    getProfile,
    getTransactions,
    signup,
    purchaseStock,
    getOpeningPrice

};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({'user': { email, password }})
    };

    return fetch(`${apiUrl}/api/v1/login/`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function signup(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({'user': { email, password }})
    };

    return fetch(`${apiUrl}/api/v1/users/`, requestOptions)
        .then(handleResponse)
        .then(user => {
          console.log(user)
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getProfile() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/api/v1/profile/`, requestOptions).then(handleResponse);
}

function getTransactions() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/api/v1/transactions/`, requestOptions).then(handleResponse);
}

function purchaseStock(ticker, price, quantity) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({'transact': { ticker, price, quantity}})
    };

    return fetch(`${apiUrl}/api/v1/purchase/`, requestOptions).then(handleResponse);
}

function getOpeningPrice(symbol){
  const requestOptions = {
      method: 'GET',
  };
  return fetch(`${iexapiUrl}stock/${symbol}/ohlc?token=pk_1d9ec4ada27746599964da901ab535f1`, requestOptions).then(handleResponse);
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
