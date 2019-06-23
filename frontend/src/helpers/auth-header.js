export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user)

    if (user.user && user.jwt) {
        return {
          'Authorization': 'Bearer ' + user.jwt,
          'Content-Type': 'application/json'
        };
    } else {
        return {};
    }
}
