import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            email: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { email, password } = this.state;
        const { dispatch } = this.props;
        if (email && password) {
            dispatch(userActions.login(email, password));
        }
    }

    render() {
        const { loggingIn, alert } = this.props;
        const { email, password, submitted } = this.state;
        return (
            <div className="login-page">
                <div className="form">
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                        <input type="text" className="form-control" placeholder="email" name="email" value={email} onChange={this.handleChange} />
                        {submitted && !email &&
                            <div className="help-block"> Email is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <input type="password" className="form-control" name="password" placeholder="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block"> Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button>Login</button>
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                    </div>
                    <p className="message">Not registered?
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
