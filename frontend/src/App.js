import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Router, Route } from 'react-router-dom';
import { history } from './helpers';
import { PrivateRoute } from './components/PrivateRoute';
import { HomePage, LoginPage, SignUpPage } from './pages';
import { alertActions } from './actions';
require('dotenv').config({ path: '/Users/shawnie/Development/TTP-FS/frontend/.env' })
console.log("api key", process.env.REACT_APP_IEX_API_KEY)

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="app">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/signup" component={SignUpPage}/>
                            </div>
                        </Router>
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

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
