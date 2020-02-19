const SHA256 = require('crypto-js/SHA256')

class Block {
    constructor(timestamp, lastHash, hash, data) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    tostring() {
        return `Block - 
        Timestamp: ${this.timestamp}
        Last Hash: ${this.lastHash.substring(0, 10)}
        Hash     : ${this.hash.substring(0, 10)}
        Data     : ${this.data}`;
    }

    static genesis() {
        return new this('Genesis time', '-----', 'f1r57-h45h', []);
    }

    static mineBlock() {
        const timestamp = Data.now();
        const lastHash = lastBlock.hash;
        const hash = Block.hash(timestamp, lastHash, data);

        return new this(timestamp, lastHash, hash, data);
    }

    static hash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }
}

module.exports = Block;