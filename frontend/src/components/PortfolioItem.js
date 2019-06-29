import React from 'react'
import { Table, Header } from 'semantic-ui-react'

const PortfolioItem = (props) => {
  // console.log("transaction props", props.transaction)
  let open = null
  let current = null
  let color = null

  if(props.transaction.ohlc && props.transaction.pricing){
    open = props.transaction.ohlc.open.price
    current = props.transaction.pricing.askPrice
    if(current < open){
      color = 'red'
    } else if (current > open){
      color = 'green'
    } else if (current == open){
      color = 'grey'
    }
  }

  return(
  <Table.Row>
    <Table.Cell size='tiny'>    <Header as='h6' color={color}>
    {props.ticker}
    </Header></Table.Cell>
    <Table.Cell size='tiny'>{props.transaction.quantity}</Table.Cell>
    <Table.Cell size='tiny'><Header as='h6' color={color}>${(props.transaction.pricing && props.transaction.ohlc) ? (props.transaction.pricing.askPrice*props.transaction.quantity).toFixed(2): 'NA'}</Header></Table.Cell>
  </Table.Row>)
}

export default PortfolioItem
