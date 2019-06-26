import React, { Component } from "react";
import {connect} from 'react-redux';
// import {userPostFetch} from '../redux/actions';
import socket from "socket.io-client";
import { portfolioActions } from '../actions';
import { PurchaseForm } from './PurchaseForm'
import { PortfolioList } from './PortfolioList'


class Portfolio extends Component {
  constructor(props) {
    super(props);

      this.state = {
        subscribed: false
      }

    const url = "https://ws-api.iextrading.com/1.0/tops";
    this.socket = socket(url, { reconnection: true });


    this.socket.on("message", message => {
      console.log(message)
      // let stock = JSON.parse(message)
      // let { symbol, askPrice, bidPrice, lastSalePrice }  = stock
      this.props.dispatch(portfolioActions.updatePortfolioStockPrice(message));
      const msg = JSON.parse(message);
      console.log(msg);
    });
  }

  componentDidMount(){
    this.socket.on("connected", message => {
      console.log(message)
      // let stock = JSON.parse(message)
      // let { symbol, askPrice, bidPrice, lastSalePrice }  = stock
      // this.props.dispatch(portfolioActions.updatePortfolioStockPrice(message));
      // const msg = JSON.parse(message);
      // console.log(msg);
    });

  }

  handleStockPriceUpdate = (symbol, askPrice, bidPrice, lastSalePrice) => {
    this.props.dispatch(portfolioActions.updatePortfolioStockPrice(symbol, askPrice, bidPrice, lastSalePrice));
  }



  tickerSymbolsForSubscription = () => {
    const { portfolio } = this.props;
    return Object.keys(portfolio).join(",")
  }

  subscribeToSocket = (channel) => {
        console.log(channel)
        this.socket.emit("subscribe", channel);
  }

  render() {
  const { portfolio } = this.props;
  const { subscribed } = this.state;
  // if (portfolio && !subscribed){
  //   this.subscribeToSocket(this.tickerSymbolsForSubscription())
  //    this.setState({subscribed: true})
  // }

    return (
      <div>
        <h3>Portfolio Page</h3>
        <button onClick={()=>this.handleStockPriceUpdate('AAPL', 25.00, 27.88, 29.95)}>
            Fake API Call
        </button>
        <PortfolioList {...this.props} />

        <PurchaseForm />

      </div>
    );
  }
}

export default Portfolio;
