import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
import TableItem from './TableItem.js'

class TableList extends React.Component {

  renderTransactions = (transactions) => {
    return transactions.map(transaction => {
      return <TableItem key={transaction.id} transaction={transaction} {...this.props}/>
    })

  }

  render() {
    return (
      <Table basic='very'  size='small'  >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Stock</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
{this.props.user.transacts ? this.renderTransactions(this.props.user.transacts) : 'No transactions'}
        </Table.Body>
      </Table>
    )
  }

}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return  user ;
}

const connectedTable = connect(mapStateToProps)(TableList);
export { connectedTable as TableList };
