import React from 'react'
import { Table } from 'semantic-ui-react'

const TableItem = (props) => {
  let price = (parseInt(props.transaction.price)).toFixed(2)
  let date = new Date(props.transaction.created_at).toGMTString();
  return(
  <Table.Row>
    <Table.Cell size='tiny'>{props.transaction.ticker}</Table.Cell>
    <Table.Cell size='tiny'>{price}</Table.Cell>
    <Table.Cell size='tiny'>{props.transaction.quantity}</Table.Cell>
    <Table.Cell size='tiny'>{date}</Table.Cell>
  </Table.Row>)
}

export default TableItem
