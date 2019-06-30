import React, { Component } from "react";
import { connect } from "react-redux";
import socket from "socket.io-client";
import { portfolioActions } from "../actions";
import { PurchaseForm } from "./PurchaseForm";
import { PortfolioList } from "./PortfolioList";
import { Grid, Divider, Segment } from "semantic-ui-react";

class Portfolio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subscribed: false
    };

    const url = "https://ws-api.iextrading.com/1.0/tops";
    this.socket = socket(url, { reconnection: true });

    this.socket.on("message", message => {
      console.log(message);
      let stock = JSON.parse(message);
      let { symbol, askPrice, bidPrice, lastSalePrice } = stock;
      let pricing = { askPrice, bidPrice, lastSalePrice };
      this.props.dispatch(
        portfolioActions.updatePortfolioStockPrice(symbol, pricing)
      );
    });
  }

  // handleFakeStockPriceUpdate = (symbol, askPrice, bidPrice, lastSalePrice) => {
  //   this.props.dispatch(
  //     portfolioActions.updatePortfolioStockPrice(
  //       symbol,
  //       askPrice,
  //       bidPrice,
  //       lastSalePrice
  //     )
  //   );
  //   // <button onClick={()=>this.handleFakeStockPriceUpdate('AAPL', 25.00, 27.88, 29.95)}>
  //   //     Fake API Call
  //   // </button>
  // };

  tickerSymbolsForSubscription = () => {
    const { portfolio } = this.props;
    return Object.keys(portfolio).join(",");
  };

  subscribeToSocket = channel => {
    console.log("subscribing to channel", channel);
    this.socket.emit("subscribe", channel);
  };

  fetchOpeningPrices = symbols => {
    for (let symbol of symbols.split(",")) {
      console.log(symbol);
      this.props.dispatch(portfolioActions.getOpeningPrice(symbol));
    }
  };

  render() {
    const { portfolio } = this.props;
    const { subscribed } = this.state;
    if (portfolio && !subscribed) {
      this.subscribeToSocket(this.tickerSymbolsForSubscription());
      this.fetchOpeningPrices(this.tickerSymbolsForSubscription());
      this.setState({ subscribed: true });
    }
    return (
      <div>
          <Grid columns={2} divided padded>
              <Grid.Column >
                <PortfolioList {...this.props} />
              </Grid.Column>
              <Grid.Column >
                <PurchaseForm
                  subscribeToPortfolioWebSocket={this.subscribeToSocket}
                />
              </Grid.Column>
          </Grid>
      </div>
    );
  }
}

export default Portfolio;
