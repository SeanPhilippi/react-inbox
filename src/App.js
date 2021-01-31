import React, { PureComponent } from 'react';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends PureComponent {
  state = {
    manager: '',
    players: [],
    balance: '',
  };

  async componentDidMount() {
    // from prop where accounts[0] would be specified in call() no longer necessary
    // when metamask provider is being used. default account is already set to first account
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  render() {
    const { manager, players, balance } = this.state;
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p className='manager'>
          This contract is manged by {manager}. There are currently {players.length} people entered,
          competing to win {web3.utils.fromWei(balance, 'ether')}
        </p>
      </div>
    );
  }
}

export default App;
