import React from 'react'
import { Button, Header, Icon, Segment, Statistic } from 'semantic-ui-react'

const StockUnavailable = (props) => {
  let lastSalePrice = null
  let symbol = null
  if(props.stockPrice.stock){
    lastSalePrice = (props.stockPrice.stock.lastSalePrice).toFixed(2)
    symbol = props.stockPrice.stock.symbol
   }
  // else if(){
  //
  // }

  let segment;


  return(
  <Segment placeholder>
    <Header icon>
      <Icon name='search' />
      Stock Market Currently Closed
    </Header>
  <Statistic>
    <Statistic.Value>${lastSalePrice}</Statistic.Value>
    <Statistic.Label>Latest Sale Price Of {symbol}</Statistic.Label>
  </Statistic>
    <Segment.Inline>
      <Button onClick={props.purchaseMoreStock}>Purchase More Stock</Button>
    </Segment.Inline>
  </Segment>)
}

export default StockUnavailable
