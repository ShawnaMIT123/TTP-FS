import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';

class HomePage extends React.Component {
    componentDidMount() {
         this.props.dispatch(userActions.getProfile());
    }

    render() {

      let message;

        const { user } = this.props;

        if (user) {
          message = <h1>Hi {user.user.email}!</h1>;
        } else {
          message =     <h1> </h1>;
        }

        return (
            <div className="col-md-6 col-md-offset-3">
                {message}
                <p>You're logged in with React & JWT!!</p>
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
