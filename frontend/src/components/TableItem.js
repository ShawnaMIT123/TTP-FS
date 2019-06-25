import React from 'react'
import { Table } from 'semantic-ui-react'

const TableItem = (props) => {
  return(
  <Table.Row>
    <Table.Cell size='tiny'>{props.transaction.ticker}</Table.Cell>
    <Table.Cell size='tiny'>{props.transaction.price}</Table.Cell>
    <Table.Cell size='tiny'>{props.transaction.quantity}</Table.Cell>
    <Table.Cell size='tiny'>{props.transaction.created_at}</Table.Cell>
  </Table.Row>)
}

export default TableItem
