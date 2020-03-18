const Block = require('./block');
const {SHARDNUM} = require('../config');
const Shard = require('./Shard');
class Blockchain{


    constructor(shard){
        this.totalblock = 0;
        this.chain = [];
        this.shard = shard%SHARDNUM;
        for (let i = 0; i < SHARDNUM; i++) {
            const shard = new Shard(i);
            this.chain.push(shard);
        }

    }

    addBlock(data){

        const block = this.chain[this.shard % SHARDNUM].addBlock(data);
        return block;

    }
    isValidChain(chain){
        if(JSON.stringify(chain[this.shard].shard[0])!== JSON.stringify(Block.genesis(this.shard))) {
            //console.log("genesis not valid");
            //console.log(chain[this.shard].shard[0],Block.genesis(this.shard));
            return false;
        }

        for(let i=1; i<chain[this.shard].shard.length; i++)
        {
            const block = chain[this.shard].shard[i];
            const lastBlock = chain[this.shard].shard[i-1];
            if(block.lastHash !== lastBlock.hash || block.hash !== Block.blockHash(block)){
                //console.log("inside forloop not valid");
                return false;

            }

        }
        return true;
    }
    replaceChain(newChain){
        console.log(newChain,this.shard,"newc");
        if(newChain[this.shard].length<= this.chain[this.shard].length){
            console.log('Recieved chain is not longer than the current chain');
            return;
        } else if(!this.isValidChain(newChain)){
            console.log('the received chain is not valid.');
            return;
        }
        console.log('Replacing blockchain with the new chain');
        this.chain= newChain;

    }
}
module.exports= Blockchain;