import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client'
import Portfolio from '../components/Portfolio'
import Transactions from '../components/Transactions'
import { userActions } from '../actions';

// const socket = require('socket.io-client')('https://ws-api.iextrading.com/1.0/tops')
import socket from "socket.io-client";

class HomePage extends React.Component {

  constructor(props) {
    super();
    this.state = {
      response: [],
      endpoint: 'https://ws-api.iextrading.com/1.0',
      portfolio: true
    };
    // const url = "https://ws-api.iextrading.com/1.0/tops";
    // this.socket = socket(url, { reconnection: true });
    // this.socket.on("connect", () => {
    //   this.socket.emit("subscribe", "SPY");
    // });
    //
    // this.socket.on("message", message => {
    //   const msg = JSON.parse(message);
    //   console.log(msg);
    //   // console.log(this.state.data); // shows newData in Data
    // });
  }


  handlePortfolioClick = () => {
    this.setState({portfolio: true});
  }

  handleTransactionClick = () => {
    this.setState({portfolio: false});
  }

  // socket.on(constants.SOCKET_GET_CHAT, data => {
  //   this.setState(previousState => ({
  //     recentChat: [...previousState.recentChat, data]
  //   }))
  // });

    componentDidMount() {
         this.props.dispatch(userActions.getProfile());
         this.props.dispatch(userActions.getTransactions())



         const url = "https://ws-api.iextrading.com/1.0/tops";
         let socketio = socket(url, { reconnection: true });
         socketio.on("connect", () => {
           console.log("connected")
           socketio.emit("subscribe", "SPY,FB,SNAP");

         });

         socketio.on("disconnect", () => {
           console.log("disconnected")
           socketio.emit("subscribe", "SPY,FB,SNAP");

         });


         socketio.on("message", message => {
           const msg = JSON.parse(message);
           console.log(msg);
           // console.log(this.state.data); // shows newData in Data
         });
         // //Very simply connect to the socket
         // const socket = socketIOClient(endpoint);




         // socket.on('connect', () => {
         //    console.log("made socket connection")
         //
         //
         //   // Subscribe to topics (i.e. appl,fb,aig+)
         //   socket.emit('subscribe', 'snap')
         //
         //   socket.on('message', message => console.log(message))
         //   //
         //   // // Unsubscribe from topics (i.e. aig+)
         //   socket.emit('unsubscribe', 'aig+')
         //
         //   socket.on('subscribe', (data) => {
         //     console.log(data)
         //   })
         // })
         //
         // socket.on('subscribe', (data) => {
         //   console.log(data)
         // })


         // socket.on("outgoing data", data => this.setState({response: data}));

    }

    render() {

      // let socket = socketIOClient('https://ws-api.iextrading.com/1.0/tops');
      //
      // socket.on('subscribe', (data) => {
      //   console.log(data)
      // })
      //
      // //Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
      // socket.on('message', message => console.log(message))


      let message;

        const { user } = this.props;

        if (user) {
          console.log(user)
          message = <h1>Hi {user.email}!</h1>;
        } else {
          message =     <h1> </h1>;
        }

        const portfolio = this.state.portfolio;

        return (
            <div className="col-md-6 col-md-offset-3">
                {message}
                <p>You're logged in with React & JWT!!</p>
                <p>
                <button onClick={this.handlePortfolioClick}>
                    Portfolio
                </button>
                <button onClick={this.handleTransactionClick}>
                    Transactions
                </button>

                    <Link to="/login">Logout</Link>
                </p>
                <div>
                  {portfolio ? (
                    <Portfolio {...this.props}/>
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
    return  { user: user, transactions: transactions.transactions, portfolio: portfolio.transactions_map }
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
