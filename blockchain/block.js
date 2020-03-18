const ChainUtil = require ('../chain-util');
const {DIFFICULTY,MINE_RATE} = require('../config');
//const {DIFFICULTY} = require('../config');
//const Blockchain = require('./index');
//nonce value for hash 


class Block{
    constructor(timestamp, lastHash, hash, data, nonce, difficulty, counter, shardNum){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.shardNum = shardNum;//
        this.difficulty = difficulty || DIFFICULTY; //difficulty for the first block
        this.counter = counter;
        
        //this.chainlength = Blockchain.chainLength();

    }
    toString(){
        return ` Block -
          Shard      : ${this.shardNum}
          Timestamp  : ${this.timestamp}
          Last Hash  : ${this.lastHash.substring(0,10)}
          Hash       : ${this.hash.substring(0,10)}
          Nonce      : ${this.nonce}
          Difficulty : ${this.difficulty}
          counter    : ${this.counter}
          Data       : ${this.data}`;
    }
    static genesis(shardNum){
        return new this('Genesis time','-----','f1r57-h45h',[],0, DIFFICULTY,0, shardNum);
    }
    static mineBlock(lastBlock, data, shardNum, counter){
        let hash, timestamp;
        
        const lastHash = lastBlock.hash;
        let{difficulty} = lastBlock;
        //let{difficulty} =lastBlock;
        difficulty = Block.adjustDifficulty(lastBlock);
        let nonce = 0;
        do{
            nonce++;
            timestamp = Date.now();
            //how to adjust difficulty
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);//how to adjust difficulty

            hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
            console.log(`the difficulty if ${difficulty}`);
            //console.log(`the difficulty if ${counter}`);
        
        } while(hash.substring(0,difficulty) !=='0'.repeat(difficulty)); //PoW
        return new this(timestamp, lastHash, hash, data ,nonce,difficulty, lastBlock.counter, shardNum);


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

        let { difficulty } = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ?
            difficulty + 1 : difficulty - 1;
        return difficulty;
        //let difficulty;
        // let{difficulty}= lastBlock;
        // //difficulty = Index.totalblock;
        //
        //
        // if(lastBlock.counter%10 ===0)
        // {
        //     difficulty = difficulty +1;
        //
        // }
        // console.log(`the counter is ${lastBlock.counter}`);
        //
        //
        // return difficulty;
        // adjust difficulty dynamically


    }

}

module.exports = Block;