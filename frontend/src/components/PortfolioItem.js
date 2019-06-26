import React from 'react'
import { Table } from 'semantic-ui-react'

const PortfolioItem = (props) => {
  console.log(props)
  debugger
  return(
  <Table.Row>
    <Table.Cell size='tiny'>{props.ticker}</Table.Cell>
    <Table.Cell size='tiny'>{props.transaction.price}</Table.Cell>
    <Table.Cell size='tiny'>{props.transaction.quantity}</Table.Cell>
  </Table.Row>)
}

export default PortfolioItem
