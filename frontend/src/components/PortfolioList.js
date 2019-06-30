import React from "react";
import { connect } from "react-redux";
import { Table } from "semantic-ui-react";
import PortfolioItem from "./PortfolioItem.js";

class PortfolioList extends React.Component {
  renderStocks = transactions => {
    return Object.keys(transactions).map(function(key, index) {
      return (
        <PortfolioItem
          key={index}
          transaction={transactions[key]}
          ticker={key}
        />
      );
    });
  };

  renderCumulativeStocksValue = transactions => {
    return Object.keys(transactions)
      .map(function(key, index) {
        let pricing = transactions[key].pricing;
        let ohlc = transactions[key].ohlc;
        let askPrice = 0;
        let latestSalePrice = 0;
        let quantity = transactions[key].quantity;
        if (pricing) {
          //if received pricing from websocket
          askPrice = pricing.askPrice;
          latestSalePrice = pricing.lastSalePrice;
          if (askPrice) {
            return askPrice * quantity;
          } else {
            return latestSalePrice * quantity;
          }
        } else if (ohlc) {
          //market closing price
          return ohlc.close.price * quantity;
        }
      })
      .reduce(function(acc, val) {
        return acc + val;
      }, 0)
      .toFixed(2);
  };

  render() {

    return (
      <div>
        {this.props.portfolio && Object.keys(this.props.portfolio).length > 0 ? (
          <div>
            <h1>
              Stocks Amount: $
              {this.renderCumulativeStocksValue(this.props.portfolio)}
            </h1>
            <Table size="small">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Symbol</Table.HeaderCell>
                  <Table.HeaderCell>Quantity</Table.HeaderCell>
                  <Table.HeaderCell>Amount</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>{this.renderStocks(this.props.portfolio)}</Table.Body>
            </Table>
          </div>
        ) : (
          <h3>No Transactions. Please purchase a stock.</h3>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  return user;
}

const connectedPortfolioList = connect(mapStateToProps)(PortfolioList);
export { connectedPortfolioList as PortfolioList };
