import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
import PortfolioItem from './TableItem.js'

class PortfolioList extends React.Component {

  renderStocks = (transactions) => {
    return Object.keys(transactions).map(function(key, index) {
      return <PortfolioItem key={key} transaction={transactions[key]} ticker={key}/>
    });
  }


  render() {
    return (
      <Table basic='very'  size='small'  >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Symbol</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>

          </Table.Row>
        </Table.Header>
        <Table.Body>
        {this.props.portfolio ? this.renderStocks(this.props.portfolio) :         <h3>No Transactions</h3>}

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

const connectedPortfolioList = connect(mapStateToProps)(PortfolioList);
export { connectedPortfolioList as PortfolioList };
