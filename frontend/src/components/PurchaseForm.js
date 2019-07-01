import React, { Component } from "react";
import { connect } from "react-redux";
// import {userPostFetch} from '../redux/actions';
import socket from "socket.io-client";
import PurchaseSegment from "./PurchaseSegment.js";
import { authHeader } from "../helpers/index";
import { apiUrl, iexapiUrl } from "../constants";

import { Form, Button, Input, Message } from "semantic-ui-react";

import { userActions, stockPriceActions, portfolioActions } from "../actions";


class PurchaseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ticker: "",
      quantity: "",
      submitted: false,
      isLoading: false,
      isTickerError: false,
      quantityError: false,
      balanceError: false,
      subscribed: false,
      subscribedStockTicker: null,
      purchaseLoading: false,
      successMessage: false
    };

    const url = "https://ws-api.iextrading.com/1.0/tops";
    this.socket = socket(url, { reconnection: true });


    this.socket.on("message", message => {
      const msg = JSON.parse(message);
      this.handleWebSocketMessage(msg);
    });



  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleWebSocketMessage = stock => {
    this.props.dispatch(stockPriceActions.updateCurrentStockPrice(stock));
  };

  handlePuchaseFormSocketDisconnect = () => {
    this.socket.close()
  }

  // componentDidMount = () => {
  //   this.setState({ subscribed: true, subscribedStockTicker: "SNAP" });
  //   setInterval(() => this.mockWebSocketConnection(), 1000);
  // };
  //
  // mockWebSocketConnection = () => {
  //   let stock = {
  //     symbol: "FB",
  //     marketPercent: 0.00901,
  //     bidSize: 200,
  //     bidPrice: 110.94,
  //     askSize: 100,
  //     askPrice: this.getRandomArbitrary(115, 130),
  //     volume: 177265,
  //     lastSalePrice: 111.76,
  //     lastSaleSize: 5,
  //     lastSaleTime: 1480446905681,
  //     lastUpdated: 1480446910557,
  //     sector: "softwareservices",
  //     securityType: "commonstock"
  //   };
  //   this.props.dispatch(stockPriceActions.updateCurrentStockPrice(stock));
  // };
  //
  // getRandomArbitrary = (min, max) => {
  //   return Math.random() * (max - min) + min;
  // };

  handleSubmit = event => {
    event.preventDefault();



    //change lastSalePrice to askPrice
    // this.props.userPostFetch(this.state)
    // this.setState({ submitted: true });
    this.setState({ purchaseLoading: true });
    this.setState({ balanceError: false, quantityError: false });
    const { user, stockPrice } = this.props;
    const { quantity } = this.state;
    const { stock } = stockPrice;
    let { askPrice, symbol } = stock;
    let { balance } = user.user;
    let quant = parseFloat(quantity);
    balance = parseFloat(balance);
    askPrice = parseFloat(askPrice);
    //
    let totalPrice = askPrice * quantity;

    if (balance < totalPrice && totalPrice) {
      debugger
      this.setState({ balanceError: true });
      this.setState({ purchaseLoading: false });
    } else {
      this.setState({ balanceError: false });
    }

    if (!Number.isInteger(quant)) {
      debugger
      this.setState({ quantityError: true });
      this.setState({ purchaseLoading: false });
    } else {
      this.setState({ quantityError: false });
    }

    if (balance >= totalPrice && totalPrice && Number.isInteger(quant)) {
      // dispatch(userActions.purchaseStock(symbol, lastSalePrice, quantity));
      let ticker = symbol;
      let price = askPrice;

      let url = `${apiUrl}/api/v1/purchase/`;
      fetch(url, {
        method: "POST", // or 'PUT'
        headers: authHeader(),
        body: JSON.stringify({ transact: { ticker, price, quantity } })
      })
        .then(res => res.json())
        .then(response => {
          //pessimistic rendering

          this.setState({ purchaseLoading: false });
          this.setState({ successMessage: true });
          this.props.dispatch(
            userActions.addNewTransaction(response.transaction)
          );
          this.props.dispatch(userActions.updateUserBalance(response.balance));
          this.props.dispatch(
            portfolioActions.updateTransactionsMap(
              response.ticker,
              response.ticker_quantity_sum
            )
          );
          this.props.dispatch(
            portfolioActions.getOpeningPrice(response.ticker)
          );
          this.props.subscribeToPortfolioWebSocket(response.ticker);

          console.log("Success:", JSON.stringify(response));
          // this.subscribeToStockChannel(this.state.ticker)
          // this.setState({isLoading: false})
        })
        .catch(error => {
          console.error("Error:", error);
          // this.setState({isTickerError: true})
          // this.setState({isLoading: false})
        });
    }
  };

  // handleTestSubmit = event => {
  //   let url = `${apiUrl}/api/v1/purchase/`;
  //   fetch(url, {
  //     method: "POST", // or 'PUT'
  //     headers: authHeader(),
  //     body: JSON.stringify({
  //       transact: { ticker: "BAC", price: "12.50", quantity: 3 }
  //     })
  //   })
  //     .then(res => res.json())
  //     .then(response => {
  //       //pessimistic rendering
  //       this.setState({ purchaseLoading: false });
  //       this.setState({ successMessage: true });
  //
  //       this.props.dispatch(
  //         userActions.addNewTransaction(response.transaction)
  //       );
  //       this.props.dispatch(userActions.updateUserBalance(response.balance));
  //       this.props.dispatch(
  //         portfolioActions.updateTransactionsMap(
  //           response.ticker,
  //           response.ticker_quantity_sum
  //         )
  //       );
  //       this.props.dispatch(portfolioActions.getOpeningPrice(response.ticker));
  //       this.props.subscribeToPortfolioWebSocket(response.ticker);
  //       console.log("Success:", JSON.stringify(response));
  //       // this.subscribeToStockChannel(this.state.ticker)
  //       // this.setState({isLoading: false})
  //     })
  //     .catch(error => {
  //       console.error("Error:", error);
  //       // this.setState({isTickerError: true})
  //       // this.setState({isLoading: false})
  //     });
  // };



  unsubscribeToChannel = () => {
    this.socket.emit("unsubscribe", this.state.subscribedStockTicker);
    this.setState({ subscribed: false, subscribedStockTicker: null });
  };

  purchaseMoreStock = () => {
    this.unsubscribeToChannel();
    this.setState({ successMessage: false, quantity: null, ticker: "" });
  };

  subscribeToStockChannel = channel => {
    this.setState({ subscribed: true, subscribedStockTicker: channel });
    this.socket.emit("subscribe", channel);
  };

  handleTickerValidity = event => {
    if (this.state.subscribed) {
      this.unsubscribeToChannel();
    }
    this.setState({ isTickerError: false }); //clear error message
    this.setState({ isLoading: true });
    let url = `https://cloud.iexapis.com/stable/stock/${
      this.state.ticker
    }/ohlc?token=pk_1d9ec4ada27746599964da901ab535f1`;
    fetch(url, {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        console.log("Success:", JSON.stringify(response));
        this.subscribeToStockChannel(this.state.ticker);
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.error("Error:", error);
        this.setState({ isTickerError: true });
        this.setState({ isLoading: false });
      });
  };
  // <Button onClick={this.handleTestSubmit}>PurchaseFormTester</Button> //remove button later

  render() {
    const {
      isLoading,
      isTickerError,
      subscribed,
      successMessage,
      quantityError,
      balanceError
    } = this.state;
    let cashBalanceMessage = "";

    const { user, stockPrice } = this.props;
    const { stock } = stockPrice;
    if (user) {
      cashBalanceMessage = parseFloat(user.user.balance).toFixed(2);
    }

    return (
      <div>
        {successMessage ? (
          <div>
            <h2>
              {" "}
              <Message
                success
                header="Congratulations"
                content={`You just purchased a stock.`}
              />{" "}
            </h2>
            <Button onClick={this.purchaseMoreStock}>
              Purchase More Stock
            </Button>
          </div>
        ) : (
                      <div><h1>Cash Balance ${cashBalanceMessage} </h1>
          <Form error>

            <h1>Purchase Stock </h1>
            <div style={{ width:"300px" }} >
            <Input
              name="ticker"
              value={this.state.ticker}
              action={{ content: "Search", onClick: this.handleTickerValidity }}
              loading={isLoading}
              onChange={this.handleChange}
              placeholder="Search stock symbol..."
            />
            </div>
            {isTickerError ? (
              <Message
                error
                header="Invalid Symbol"
                content="Please enter valid stock symbol."
              />
            ) : null}
            {subscribed ? (
              <div>
                <PurchaseSegment
                  {...this.props}
                  balanceError={balanceError}
                  quantityError={quantityError}
                  purchaseMoreStock={this.purchaseMoreStock}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  purchaseLoading={this.state.purchaseLoading}
                />
              </div>
            ) : null}
          </Form>
                </div>
        )}
      </div>

    );
  }
}

function mapStateToProps(state) {
  const { authentication, stockPrice } = state;
  const { user } = authentication;
  return {
    user: user,
    stockPrice: stockPrice
  };
}

const connectedPurchaseForm = connect(mapStateToProps)(PurchaseForm);
export { connectedPurchaseForm as PurchaseForm };
