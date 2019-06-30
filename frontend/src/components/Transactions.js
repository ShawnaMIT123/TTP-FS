import React, { Component } from "react";
import { TableList } from './TableList'


class Transactions extends Component {
  // change to functional component
  render() {
    return (
      <div>
        <h3>Transactions Page</h3>
        <TableList {...this.props} />
      </div>
    );
  }
}

export default Transactions;
