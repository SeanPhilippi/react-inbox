import React, { PureComponent } from 'react';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends PureComponent {
  state = {
    manager: '',
  }

  async componentDidMount() {
    // from prop where accounts[0] would be specified in call() no longer necessary
    // when metamask provider is being used. default account is already set to first account
    const manager = await lottery.methods.manager().call();
    this.setState({ manager });
  }

  render() {
      return (
        <div>
          <h2>Lottery Contract</h2>
          <p className='manager'>
            This contract is manged by {this.state.manager}
          </p>
        </div>
      )
  }

}

export default App;
