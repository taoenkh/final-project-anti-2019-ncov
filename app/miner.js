const Wallet = require('../wallet');
const Transaction = require('../wallet/transaction');

class Miner {
  constructor(blockchain, transactionPool, wallet, p2pServer) {
      //reference of p2pserver to communicate to each server
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.p2pServer = p2pServer;
  }

  mine() {
    const validTransactions = this.transactionPool.validTransactions();
    //include a reward for the miner
    //broadcast to every miner to clear their transaction pool
    validTransactions.push(
      Transaction.rewardTransaction(this.wallet, Wallet.blockchainWallet())
    );
    //create a block consisting of valid transactions
    const block = this.blockchain.addBlock(validTransactions);
    //synchronize the chain in the peer to peer server
    this.p2pServer.syncChains();
    //clear the transaction pool
    this.transactionPool.clear();
    this.p2pServer.broadcastClearTransactions();

    return block;
  }
}

module.exports = Miner;