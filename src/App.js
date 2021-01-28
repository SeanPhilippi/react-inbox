import React, { PureComponent } from 'react';
import './App.css';
import web3 from './web3';

class App extends PureComponent {
  render() {
    web3.eth.getAccounts()
      .then(console.log);

      return (
        <div></div>
      )
  }

}

export default App;
