import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import { Provider } from "react-redux";
import { store } from "./helpers";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// 'https://cloud.iexapis.com/stable/'

// let url = `https://cloud.iexapis.com/stable/stock/aapl/ohlc?token=pk_1d9ec4ada27746599964da901ab535f1`
//
//   fetch(url, {
//   method: 'GET', // or 'PUT' data can be `string` or {object}!
//   headers:{
//     'Content-Type': 'application/json'
//   }
// }).then(res => res.json())
// .then(response => console.log('Success:', JSON.stringify(response)))
// .catch(error => console.error('Error:', error));
