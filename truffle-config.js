require('babel-register');
require('babel-polyfill');
require('dotenv').config()


var HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
  
  ropsten: {
    provider: function() {
      return new HDWalletProvider(process.env.MNEMONIC, "https://ropsten.infura.io/v3/2d7f5e272f45476b8115fcf553258f76")
    },
    network_id: 3,
    gas: 8000000      //make sure this gas allocation isn't over 4M, which is the max
  }
},
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      version : "0.5.0"
    }
  }
}
