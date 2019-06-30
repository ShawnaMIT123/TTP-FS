import React from "react";
import { Button, Header, Icon, Segment, Statistic } from "semantic-ui-react";

const BuyStock = props => {
  let symbol = null;
  let askPrice = null;
  if (props.stockPrice.stock) {
    askPrice = props.stockPrice.stock.askPrice;
    symbol = props.stockPrice.stock.symbol;
  }

  return (
    <Segment placeholder loading={props.purchaseLoading}>
      <Header icon>Purchase Stock</Header>
      <Statistic>
        <Statistic.Value>${askPrice}</Statistic.Value>
        <Statistic.Label>Sale Price Of {symbol}</Statistic.Label>
      </Statistic>
      <br />
      <input
        type="number"
        label="Quantity"
        id="quantity"
        name="quantity"
        min="1"
        step="1"
        onChange={props.handleChange}
      />
      <br />
      <Button type="submit" onClick={props.handleSubmit} color="red">
        Buy
      </Button>
    </Segment>
  );
};

export default BuyStock;
