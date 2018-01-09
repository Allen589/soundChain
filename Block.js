const SHA256 = require('crypto-js/sha256');
const SC = require('node-soundcloud');
class Block {
  constructor(index, timestamp, soundCloudData, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.soundCloudData = soundCloudData;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash
       + this.timestamp + JSON.stringify(this.soundCloudData) + this.nonce).toString();
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

module.exports = Block;
