import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {userPostFetch} from '../redux/actions';
import { userActions } from '../actions';


class SignUpPage extends Component {
  state = {
    email: "",
    password: "",
    submitted: false
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault()
    // this.props.userPostFetch(this.state)
    this.setState({ submitted: true });
    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (email && password) {
         dispatch(userActions.signup(email, password));
    }
  }

  render() {

    const { alert } = this.props;

    return (
    <div className="login-page">
      <div className="form">
      <form onSubmit={this.handleSubmit} className="register-form" >
        <h1>Sign Up For An Account</h1>

        <input
          name='email'
          placeholder='email'
          value={this.state.email}
          onChange={this.handleChange}
          /><br/>


        <input
          type='password'
          name='password'
          placeholder='Password'
          value={this.state.password}
          onChange={this.handleChange}
          /><br/>

          <div className="form-group">
              <button>Submit</button>
              {alert.message &&
                  <div className={`alert ${alert.type}`}>{alert.message}</div>
              }
          </div>
      </form>
      </div>
    </div>
    )
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
