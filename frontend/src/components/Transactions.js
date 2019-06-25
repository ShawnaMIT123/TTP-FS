import React, { Component } from "react";
import { TableList } from './TableList'


class Transactions extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <h3>Transactions Page</h3>
        <TableList />

      </div>
    );
  }
}

export default Transactions;
