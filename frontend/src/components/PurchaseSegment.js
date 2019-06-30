import React from 'react'
import { Button, Header, Icon, Segment, Statistic } from 'semantic-ui-react'
import BuyStock from './BuyStock'
import StockUnavailable from './StockUnavailable'

const PurchaseSegment = (props) => {
  let askPrice = null
  if(props.stockPrice.stock){
    askPrice = props.stockPrice.stock.askPrice
  }
  
  let segment;

  if (askPrice) {
    segment = <BuyStock {...props} />;
  } else {
    segment = <StockUnavailable {...props} />;
  }

  return(
  <Segment placeholder>
    {segment}
  </Segment>)
}

export default PurchaseSegment
