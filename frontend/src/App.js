import React from 'react';
import { connect } from 'react-redux';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}


function mapStateToProps(state) {
    return {
        state
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
