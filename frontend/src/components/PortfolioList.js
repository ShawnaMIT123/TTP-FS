import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
import PortfolioItem from './PortfolioItem.js'

class PortfolioList extends React.Component {

  renderStocks = (transactions) => {
    return Object.keys(transactions).map(function(key, index) {
      return <PortfolioItem key={index} transaction={transactions[key]} ticker={key}/>
    });
  }

        // {this.renderStocks(this.props.portfolio)}
  render() {
    return(
    <div>
      {this.props.portfolio ?
      (<Table basic='very'  size='small'  >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Symbol</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {this.renderStocks(this.props.portfolio)}
        </Table.Body>
      </Table>): (<h3>No Transactions</h3>)}
     </div>);
   }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return  user ;
}

const connectedPortfolioList = connect(mapStateToProps)(PortfolioList);
export { connectedPortfolioList as PortfolioList };
