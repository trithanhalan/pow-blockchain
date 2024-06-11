const crypto = require('crypto');
const uuid = require('uuid');

/**
 * Block represents a block in the blockchain. It has the
 * following params:
 * @index represents its position in the blockchain
 * @timestamp shows when it was created
 * @transactions represents the data about transactions
 * added to the chain
 * @hash represents the hash of the previous block
 */
class Block {
    constructor(index, transactions, prevHash, nonce, hash) {
        this.index = index;
        this.timestamp = Math.floor(Date.now() / 1000);
        this.transactions = transactions;
        this.prevHash = prevHash;
        this.hash = hash;
        this.nonce = nonce;
    }
}

/**
 * A blockchain transaction. Has an amount, sender and a
 * recipient (not UTXO).
 */
class Transaction {
    constructor(amount, sender, recipient) {
        this.amount = amount;
        this.sender = sender;
        this.recipient = recipient;
        this.tx_id = uuid.v4().split('-').join('');
    }
}

/**
 * Blockchain represents the entire blockchain with the
 * ability to create transactions, mine and validate
 * all blocks.
 */
class Blockchain {
    constructor() {
        this.chain = [];
        this.pendingTransactions = [];
        this.difficulty = 3; // Initial difficulty
        this.blockTime = []; // Array to store block mining times
        this.adjustmentInterval = 5; // Number of blocks after which difficulty adjusts
        this.addBlock('0');
    }

    /**
     * Creates a transaction on the blockchain
     */
    createTransaction(amount, sender, recipient) {
        this.pendingTransactions.push(new Transaction(amount, sender, recipient));
    }

    /**
     * Add a block to the blockchain
     */
    addBlock(nonce) {
        let index = this.chain.length;
        let prevHash = this.chain.length !== 0 ? this.chain[this.chain.length - 1].hash : '0';
        let hash = this.getHash(prevHash, this.pendingTransactions, nonce);
        let block = new Block(index, this.pendingTransactions, prevHash, nonce, hash);

        // reset pending txs
        this.pendingTransactions = [];
        this.chain.push(block);

        // Adjust difficulty if needed
        if (this.chain.length % this.adjustmentInterval === 0) {
            this.adjustDifficulty();
        }
    }

    /**
     * Gets the hash of a block.
     */
    getHash(prevHash, txs, nonce) {
        var encrypt = prevHash + nonce;
        txs.forEach((tx) => { encrypt += tx.tx_id; });
        var hash = crypto.createHmac('sha256', "secret")
            .update(encrypt)
            .digest('hex');
        return hash;
    }

    /**
     * Find nonce that satisfies our proof of work.
     */
    proofOfWork() {
        let nonce = 0;
        let hash = '';
        const target = Array(this.difficulty + 1).join("0");

        while (!hash.startsWith(target)) {
            nonce++;
            hash = this.getHash(this.chain.length !== 0 ? this.chain[this.chain.length - 1].hash : '0', this.pendingTransactions, nonce);
        }

        return nonce;
    }

    /**
     * Mine a block and add it to the chain.
     */
    mine() {
        let startTime = Date.now();
        let nonce = this.proofOfWork();
        let endTime = Date.now();
        let timeTaken = (endTime - startTime) / 1000; // Time in seconds
        this.blockTime.push(timeTaken);

        this.addBlock(nonce);
    }

    /**
     * Adjust difficulty based on the average time taken to mine the last N blocks.
     */
    adjustDifficulty() {
        let avgTime = this.blockTime.reduce((a, b) => a + b, 0) / this.blockTime.length;
        console.log("Average time to mine a block: " + avgTime + " seconds");

        if (avgTime < 2) {
            this.difficulty++;
            console.log("Increasing difficulty to " + this.difficulty);
        } else if (avgTime > 5) {
            this.difficulty--;
            console.log("Decreasing difficulty to " + this.difficulty);
        }

        // Clear the blockTime array for the next interval
        this.blockTime = [];
    }

    /**
     * Check if the chain is valid by going through all blocks and comparing their stored
     * hash with the computed hash.
     */
    chainIsValid() {
        for (var i = 0; i < this.chain.length; i++) {
            let tx_id_list = [];
            this.chain[i].transactions.forEach((tx) => tx_id_list.push(tx.tx_id));

            if (i == 0 && this.chain[i].hash !== this.getHash('0', [], '0')) {
                return false;
            }
            if (i > 0 && this.chain[i].hash !== this.getHash(this.chain[i - 1].hash, this.chain[i].transactions, this.chain[i].nonce)) {
                return false;
            }
            if (i > 0 && this.chain[i].prevHash !== this.chain[i - 1].hash) {
                return false;
            }
        }
        return true;
    }
}

/**
 * Constructs a Merkle tree from the list of transaction IDs
 * and returns the Merkle root.
 */
function constructMerkleTree(inputs) {
    if (inputs.length === 1) {
        return inputs[0];
    }

    let newLevel = [];
    for (let i = 0; i < inputs.length; i += 2) {
        if (i + 1 < inputs.length) {
            newLevel.push(crypto.createHash('sha256').update(inputs[i] + inputs[i + 1]).digest('hex'));
        } else {
            newLevel.push(inputs[i]);
        }
    }

    return constructMerkleTree(newLevel);
}

function simulateChain(blockchain, numTxs, numBlocks) {
    for (let i = 0; i < numBlocks; i++) {
        let numTxsRand = Math.floor(Math.random() * Math.floor(numTxs));
        for (let j = 0; j < numTxsRand; j++) {
            let sender = uuid.v4().substr(0, 5);
            let receiver = uuid.v4().substr(0, 5);
            blockchain.createTransaction(Math.floor(Math.random() * Math.floor(1000)), sender, receiver);
        }
        blockchain.mine();
    }
}

const BChain = new Blockchain();
simulateChain(BChain, 5, 15);

module.exports = Blockchain;

// Uncomment these to run a simulation
console.dir(BChain, { depth: null });
console.log("******** Validity of this blockchain: ", BChain.chainIsValid());
