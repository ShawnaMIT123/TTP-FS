import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { userActions } from "../actions";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // reset login status
    this.props.dispatch(userActions.logout());

    this.state = {
      email: "",
      password: "",
      submitted: false
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ submitted: true });
    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (email && password) {
      dispatch(userActions.login(email, password));
    }
  };

  render() {
    const { loggingIn, alert } = this.props;
    const { email, password, submitted } = this.state;
    return (
      <div className="login-page">
        <div className="form">
          <form className="login-form" onSubmit={this.handleSubmit}>
            <h1>Log Into SMX Account</h1>

            <input
              name="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <br />
            {submitted && !email && <div> Email is required</div>}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <br />
            {submitted && !password && <div> Password is required</div>}
            <div className="form-group">
              <button>Login</button>
              {alert.message && (
                <div className={`alert ${alert.type}`}>{alert.message}</div>
              )}
            </div>
            <p className="message">
              Not registered?
              <Link to="/signup"> Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  const { alert } = state;
  return {
    loggingIn,
    alert
  };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
