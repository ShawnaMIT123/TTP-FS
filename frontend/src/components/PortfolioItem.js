import React from 'react'
import { Table } from 'semantic-ui-react'

const PortfolioItem = (props) => {
  console.log("transaction props", props.transaction)
  return(
  <Table.Row>
    <Table.Cell size='tiny'>{props.ticker}</Table.Cell>
    <Table.Cell size='tiny'>{props.transaction.quantity}</Table.Cell>
    <Table.Cell size='tiny'>{props.transaction.pricing ? (props.transaction.pricing.askPrice*props.transaction.quantity).toFixed(2): '$0.00'}</Table.Cell>
  </Table.Row>)
}

export default PortfolioItem
