const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash
       + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
  }
  /* This function will place zeros corresponding to the difficulty parameter
   in front of our hash. The higher the difficulty, the longer it takes for
   spammers to create fake blocks. (Proof of Work) */
  mineBlock(difficulty) {
    // We need to check if our hash starts with the right amount of zeros
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log("Block mined: " + this.hash);

  }


}

class blockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
  }

  createGenesisBlock() {
    return new Block(0, "01/01/2018", "Genesis block", "0");
  }

  getLatestBlock() {
    return new Block(this.chain.length - 1);
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid() {
    // Skip the genesis block
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }

}

let coin = new blockChain();
coin.addBlock(new Block(1, "01/01/2018", {amount : 4}));
coin.addBlock(new Block(2, "01/01/2018", {amount : 10}));

console.log(JSON.stringify(coin, null, 4));
