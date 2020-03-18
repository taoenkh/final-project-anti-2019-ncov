const Websocket = require('ws');
const {SHARDNUM} = require('../config');

const P2P_PORT = process.env. P2P_PORT || 5002;
const peers = process.env.PEERS ? process.env.PEERS.split(','): [];
const MESSAGE_TYPES={
    chain: 'CHAIN',
    transaction: 'TRANSACTION',
    clear_transactions: 'CLEAR_TRANSACTION'

};

class P2pServer {
    constructor(blockchain,transactionPool){
        this.nodeID = 0;
        this.blockchain  = blockchain;
        this.transactionPool = transactionPool;
        this.sockets = new Map();

    }
    listen(){
        const server = new Websocket.Server({port: P2P_PORT });
        server.on('connection', socket=>this.connectSocket(socket));
        this.connnectToPeers();
        console.log(`Listening to peer-to-peer connections on ${P2P_PORT}`);


    }
    connnectToPeers(){
        console.log(this.sockets, 'Sockets in connect Peers');
        this.nodeID = peers.length;


        for (let i = 0; i < peers.length;i++) {
            //ws://localhost:5001
            if (i !== this.nodeID) {
                if (this.nodeID % SHARDNUM === i ) {
                    const socket = new Websocket(peers[i]);
                    socket.on('open', () => this.connectSocket(socket));
                }
            }
        }
    }
    connectSocket(socket){
        let shard = this.nodeID % SHARDNUM;
        this.blockchain.shardnum = shard;
        if (this.sockets.has(shard)) {
            this.sockets.get(shard).push(socket);
        }
        else{
            this.sockets.set(shard, [socket]);
        }
        console.log(peers);
        console.log('Socket connected');
        this.messageHandler(socket);
        socket.send(JSON.stringify(this.blockchain.chain));

    }
    messageHandler(socket) {
        socket.on('message', message => {
            const data = JSON.parse(message);
            console.log('data', data);
            switch(data.type) {
                case MESSAGE_TYPES.chain:
                    this.blockchain.replaceChain(data.chain);
                    break;
                case MESSAGE_TYPES.transaction:
                    this.transactionPool.updateOrAddTransaction(data.transaction);
                    break;
                case MESSAGE_TYPES.clear_transactions:
                    this.transactionPool.clear();
                    break;

            }
        });
    }

    sendChain(socket) {
        console.log(this.blockchain.chain, "syncchain");
        socket.send(JSON.stringify({
            type: MESSAGE_TYPES.chain,
            chain: this.blockchain.chain
        }));
    }

    sendTransaction(socket, transaction) {
        socket.send(JSON.stringify({
            type: MESSAGE_TYPES.transaction,
            transaction
        }));
    }
    syncChains(){
        this.sockets.get(this.nodeID % SHARDNUM).forEach(socket=>this.sendChain(socket));
    }
    broadcastTransaction(transaction) {

        //console.log(this.sockets);
        this.sockets.get(this.nodeID % SHARDNUM).forEach(socket => this.sendTransaction(socket, transaction));
    }
    broadcastClearTransactions() {
        this.sockets.get(this.nodeID % SHARDNUM).forEach(socket => socket.send(JSON.stringify({
            type: MESSAGE_TYPES.clear_transactions
        })));
    }

}
module.exports= P2pServer; 