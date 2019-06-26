import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {userPostFetch} from '../redux/actions';
import socket from "socket.io-client";

import { userActions } from '../actions';


class PurchaseForm extends Component {

  constructor(props) {
    super(props);

      this.state = {
        ticker: "",
        currentTicker: "",
        quantity: "",
        submitted: false,
        socketTicker: null

      }

    const url = "https://ws-api.iextrading.com/1.0/tops";
    this.socket = socket(url, { reconnection: true });


    this.socket.on("message", message => {
      const msg = JSON.parse(message);
      this.setState({socketTicker : msg})
      console.log(msg);
      // console.log(this.state.data); // shows newData in Data
    });
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
    const { socketTicker, quantity } = this.state;
    const { lastSalePrice, symbol } = socketTicker;
    const { dispatch, user } = this.props;
    const { balance } = user

    let totalPrice = lastSalePrice * quantity
    console.log(totalPrice)


    if (balance >= totalPrice && totalPrice) {
         dispatch(userActions.purchaseStock(symbol, lastSalePrice, quantity));
    }
  }



  handleTickerValidity = event => {

    var url = `https://api.iextrading.com/1.0/tops?symbols=${this.state.ticker}`;

    fetch(url, {
      method: 'GET', // or 'PUT'
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => JSON.stringify(response))
    .then(response =>{
      if(response.length < 3){
        console.log(response)
        this.socket.emit("subscribe", this.state.ticker );
      }else{
        // this.socket.emit("unsubscribe", this.state.currentTicker)
        // this.setState({currentTicker : this.state.ticker})
        this.socket.emit("subscribe", this.state.ticker );

      }

    })


      // this.socket.emit("subscribe", this.state.ticker );
  }





  render() {
    let message = ""

    const { user } = this.props;
    if (user) {
      message = user.balance;
    }

    return (
      <form onSubmit={this.handleSubmit}>
       <h2>Cash ${message} </h2>
        <h1>Purchase Stock </h1>


        <label>Ticker</label>
        <input
          name='ticker'
          placeholder='Ticker Symbol'
          value={this.state.ticker}
          onChange={this.handleChange}
          /><br/>
          <button type='button' onClick={this.handleTickerValidity}>Check Price</button>

        <label>Quantity</label>
        <input
          type='integer'
          name='quantity'
          placeholder='quantity'
          value={this.state.quantity}
          onChange={this.handleChange}
          /><br/>


        <input type='submit' />
      </form>
    )
  }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return  user ;
}

const connectedPurchaseForm = connect(mapStateToProps)(PurchaseForm);
export { connectedPurchaseForm as PurchaseForm };
