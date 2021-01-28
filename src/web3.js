import Web3 from 'web3';

// grab currentProvider from metamask injected web3, and give it to local web3
const web3 = new Web3(window.web3.currentProvider);

export default web3;