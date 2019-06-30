import React, { Component } from "react";
import { connect } from "react-redux";
import { userActions } from "../actions";

class SignUpPage extends Component {
  state = {
    email: "",
    password: "",
    submitted: false,
    first_name: "",
    last_name: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ submitted: true });
    const { email, password, first_name, last_name } = this.state;
    const { dispatch } = this.props;
    if (email && password && first_name && last_name) {
      dispatch(userActions.signup(email, password, first_name, last_name));
    }
  };

  render() {
    const { alert } = this.props;
    const { email, password, submitted, first_name, last_name } = this.state;

    return (
      <div className="login-page">
        <div className="form">
          <form onSubmit={this.handleSubmit} className="register-form">
            <h1>Sign Up For An Account</h1>
            <input
              name="first_name"
              placeholder="First Name"
              value={this.state.first_name}
              onChange={this.handleChange}
            />
            {submitted && !first_name && <div> First name is required</div>}
            <input
              name="last_name"
              placeholder="Last Name"
              value={this.state.last_name}
              onChange={this.handleChange}
            />
            {submitted && !last_name && <div> Last name is required</div>}
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
              <button>Submit</button>
              {alert.message && (
                <div className={`alert ${alert.type}`}>{alert.message}</div>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedSignUpPage = connect(mapStateToProps)(SignUpPage);
export { connectedSignUpPage as SignUpPage };
