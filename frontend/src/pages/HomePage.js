import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import socketIOClient from "socket.io-client";
import Portfolio from "../components/Portfolio";
import Transactions from "../components/Transactions";
import NavBar from "../components/NavBar";
import { userActions } from "../actions";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { portfolio: true };
  }

  handlePortfolioClick = () => {
    this.setState({ portfolio: true });
  };

  handleTransactionClick = () => {
    this.setState({ portfolio: false });
  };

  componentDidMount() {
    this.props.dispatch(userActions.getProfile());
    this.props.dispatch(userActions.getTransactions());
  }

  render() {
    let message;
    const { user } = this.props;
    const { portfolio } = this.state;
    if (user) {
      message = (
        <h1>Welcome to Stock Market Exchange (SMX) {user.user.first_name}!</h1>
      );
    } else {
      message = <h1>Welcome to Stock Market Exchange (SMX)!</h1>;
    }
    return (
      <div>
        <NavBar
          handleTransactionClick={this.handleTransactionClick}
          handlePortfolioClick={this.handlePortfolioClick}
        />
        {message}
        <div>
          {portfolio ? (
            <Portfolio {...this.props} />
          ) : (
            <Transactions {...this.props} />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { authentication, transactions, portfolio } = state;
  const { user } = authentication;
  return {
    user: user,
    transactions: transactions.transactions,
    portfolio: portfolio.transactions_map
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
