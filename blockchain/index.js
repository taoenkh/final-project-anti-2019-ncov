const Block = require('./block');
const {SHARDNUM} = require('../config');
const Shard = require('./Shard');

class Blockchain{


    constructor(){
        this.totalblock = 0;
        this.chain = [];
        for (let i = 0; i < SHARDNUM; i++) {
            const shard = new Shard(i);
            this.chain.push(shard);
        }

    }

    addBlock(data){

        const block = this.chain[this.totalblock++ % SHARDNUM].addBlock(data);
        return block;

    }
    isValidChain(chain){
        if(JSON.stringify(chain[0])!== JSON.stringify(Block.genesis())) return false;

        for(let i=1; i<chain.length; i++)
        {
            const block = chain[i];
            const lastBlock = chain[i-1];
            if(block.lastHash !== lastBlock.hash || block.hash !== Block.blockHash(block)){
                    return false;

            }

        }
        return true;
    }
    replaceChain(newChain){
        if(newChain.length<= this.chain.length){
        console.log('Recieved chain is not longer than the current chain');
        return;
        } else if(!this.isValidChain(newChain)){
            console.log('the received chian is not valid.');
            return;
        }
        console.log('Replacing blockchain with the new chain');
        this.chain= newChain;

    }
}
module.exports= Blockchain;