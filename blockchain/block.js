const ChainUtil = require ('../chain-util');
const {DIFFICULTY,MINE_RATE} = require('../config');
//nonce value for hash 


class Block{
    constructor(timestamp, lastHash, hash, data, nonce,difficulty,shardnum){
        this.shardnum = shardnum;
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY; //difficulty for the first block

    }
    toString(){
        return ` Block -
          Shard     : ${this.shardnum}
          Timestamp : ${this.timestamp}
          Last Hash : ${this.lastHash.substring(0,10)}
          Hash      : ${this.hash.substring(0,10)}
          Nonce     : ${this.nonce}
          Difficulty: ${this.difficulty}
          Data     : ${this.data}`;
    }
    static genesis(shard){
        return new this('Genesis time','-----','f1r57-h45h',[],0, DIFFICULTY, shard);
    }
    static mineBlock(lastBlock, data, shard){
        let hash, timestamp;
        
        const lastHash = lastBlock.hash;
        let{difficulty} = lastBlock;
        let nonce = 0;

        do{
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);//how to adjust difficulty
            hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);


        } while(hash.substring(0,difficulty) !=='0'.repeat(difficulty)); //PoW
        return new this(timestamp, lastHash, hash, data ,nonce,difficulty,shard);


    }
    static hash(timestamp, lastHash, data,nonce,difficulty){
        return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }


    static blockHash(block){
        const {timestamp, lastHash, data, nonce,difficulty}= block;
        return Block.hash(timestamp, lastHash, data, nonce,difficulty);

    }
    static adjustDifficulty(lastBlock, currentTime)
    {
        let{difficulty}= lastBlock;
        difficulty = lastBlock.timestamp+MINE_RATE >currentTime? difficulty+1 : difficulty-1;
        return difficulty;
        // adjust difficulty dynamically


    }

}

module.exports = Block;