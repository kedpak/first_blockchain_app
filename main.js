const SHA256 = require('crypto-js/sha256');


class Block {
    constructor(index, timestamp, data, previousHash='') {
	this.index = index;
	this.timestamp = timestamp;
	this.data = data;
	this.previousHash = previousHash;
	this.hash = this.calculateHash();
    }

    calculateHash() {
	return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
  }


class BlockChain {
    constructor() {
	this.chain = [this.createGenesisBlock()];
    }
    
    createGenesisBlock() {
	return new Block(0, '5/8/2017', "first block!", "0");
    }
    
    getLatestBlock() {
	return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
	newBlock.previousHash = this.getLatestBlock().hash;
	newBlock.hash = newBlock.calculateHash();
	this.chain.push(newBlock);
    }
  
}

let myCoin = new BlockChain();
myCoin.addBlock(new Block(1, "12/1/2017", {amount: 12}));
myCoin.addBlock(new Block(2, "12/4/2017", {amount: 4}));

console.log(JSON.stringify(myCoin, null, 4));

