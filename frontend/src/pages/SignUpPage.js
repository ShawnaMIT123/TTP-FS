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
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Sign Up For An Account</h1>

        <label>Email</label>
        <input
          name='email'
          placeholder='email'
          value={this.state.email}
          onChange={this.handleChange}
          /><br/>

        <label>Password</label>
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={this.state.password}
          onChange={this.handleChange}
          /><br/>


        <input type='submit'/>
      </form>
    )
  }
}

function mapStateToProps(state) {
    return {
       state
    };
}

const connectedLoginPage = connect(mapStateToProps)(SignUpPage);
export { connectedLoginPage as SignUpPage };
