const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');
const P2pServer = require('./p2p-server');
const Wallet = require('../wallet');
const TransactionPool = require('../wallet/transaction-pool');
const Miner = require('./miner');
const path = require('path');
//const PubSub = require('../pubsub');//
const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new Blockchain(HTTP_PORT - 3001);
//const pubsub = new PubSub({bc});//
//setTimeout(()=>pubsub.broadcastChain(),1000);
const wallet = new Wallet();
const tp  = new TransactionPool();
const p2pServer = new P2pServer(bc,tp);
const miner= new Miner(bc, tp,wallet,p2pServer);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('/blocks',(req, res)=>{
    res.json(bc.chain);
    //res.redirect('/blocks');

});
app.get('/blocks/length',(req, res)=>{
  res.json(bc.chain.length);

});
app.get('/transactions', (req, res) => {
    res.json(tp.transactions);
  });
  
app.post('/transact', (req, res) => {
    const { recipient, amount } = req.body;
    const transaction = wallet.createTransaction(recipient, amount, bc, tp);
    p2pServer.broadcastTransaction(transaction);
    res.redirect('/transactions');
});
app.get('/public-key', (req, res)=>{
  res.json({publicKey: wallet.publicKey})// allow users to see the public key and decide to share to other individuals.

});

app.get('/mine-transactions',(req, res)=>{
  const block = miner.mine();
  console.log(`New block added: ${block.toString()}`);
  res.redirect('/blocks');
  

});


app.post('/mine',(req, res)=>{
    //const { data} = req.body;
    //bc.addBlock({data});

    const block = bc.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);
    p2pServer.syncChains();
    //pubsub.broadcastChain();
    res.redirect('/api/blocks');
});
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));

});
// const walletFoo = new Wallet();
// const walletBar = new Wallet();

// const generateWalletTransaction = ({ wallet, recipient, amount }) => {
//   const transaction = wallet.createTransaction(recipient, amount, bc, tp);

// };

// const walletAction = () => generateWalletTransaction({
//   wallet, recipient: walletFoo.publicKey, amount: 5
// });

// const walletFooAction = () => generateWalletTransaction({
//   wallet: walletFoo, recipient: walletBar.publicKey, amount: 10
// });

// const walletBarAction = () => generateWalletTransaction({
//   wallet: walletBar, recipient: wallet.publicKey, amount: 15
// });

// for (let i=0; i<20; i++) {
//   if (i%3 === 0) {
//     walletAction();
//     walletFooAction();
//   } else if (i%3 === 1) {
//     walletAction();
//     walletBarAction();
//   } else {
//     walletFooAction();
//     walletBarAction();
//   }
//   const block = miner.mine();


  
// }
  







//const DEFAULT_PORT = 3000;
//if(process.env.GENERATE_PEER_PORT==='true'){
  //PEER_PORT = DEFAULT_PORT+ Math.ceil(Math.random()*1000);
//}
//const PORT = PEER_PORT || DEFAULT_PORT;
app.listen(HTTP_PORT,()=> console.log(`listening on port ${HTTP_PORT}`));
p2pServer.listen();