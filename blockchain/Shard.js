const Block = require('./block');

class Shard{

    constructor(shardnum){
        this.length = 1;
        this.shardnum = shardnum;
        this.shard = [Block.genesis(shardnum)]
    }

    addBlock(data){

        const block = Block.mineBlock(this.shard[this.shard.length-1],data,this.shardnum, this.counter);

        this.shard.push(block);
        this.length++;
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
        if(newChain.length<= this.shard.length){
            console.log('Recieved chain is not longer than the current chain');
            return;
        } else if(!this.isValidChain(newChain)){
            console.log('the received chian is not valid.');
            return;
        }
        console.log('Replacing blockchain with the new chain');
        this.shard= newChain;

    }
}
module.exports = Shard;