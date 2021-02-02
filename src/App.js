import React, { PureComponent } from 'react';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends PureComponent {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: '',
  };

  async componentDidMount() {
    // from prop where accounts[0] would be specified in call() no longer necessary
    // when metamask provider is being used. default account is already set to first account
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  onSubmit = async e => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    console.log('web3', web3);
    console.log('accounts', accounts);

    this.setState({ message: 'Waiting on transaction success...' });
    // for .send(), from key needs to be specified still with the version of web3 being used
    await lottery.methods.enter().send({
      from: accounts[0],
      // value has to be in wei
      value: web3.utils.toWei(this.state.value, 'ether'),
    });
    this.setState({ message: 'You have been enetered!' });
  };

  render() {
    const { manager, players, balance, value, message } = this.state;
    return (
      <div className='container'>
        <h2>Lottery Contract</h2>
        {players.length && balance.length && manager.length ? (
          <p className='manager'>
            This contract is managed by {manager}. There {players.length < 2 ? 'is' : 'are'}{' '}
            currently {players.length} {players.length < 2 ? 'person' : 'people'} entered, competing
            to win {web3.utils.fromWei(balance, 'ether')} ether.
          </p>
        ) : null}

        <hr />

        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter: </label>
            <input value={value} onChange={e => this.setState({ value: e.target.value })} />
          </div>
          <br />
          <button>Enter</button>
        </form>

        <h1>{message}</h1>
      </div>
    );
  }
}

export default App;
