# Blockchain Simulator

This is a blockchain simulator where transactions can be added to a mempool and can be mined into a block using PoW.

## Running
1. Install required modules: `npm install #might need sudo`
2. Run a node on one terminal by specifying a port: `PORT=8000 && node blockchain-peer.js`
3. Run as many nodes as you want in separate terminals using the above command with different ports

## Interacting with the blockchain
You can simulate transactions using some HTTP request client like cURL (terminal) or [Postman](https://www.postman.com/) (GUI).
- You can start by making nodes find each other using this request body `{ "peer": "http://localhost:8081" }` and sending it to one of the nodes as a POST request to the endpoint `http://localhost:8080/add_known_peer`
- Then, you can make nodes broadcast by passing this request body `{ "msg": "Hello world!"}` as a POST request to the endpoint `http://localhost:8080/broadcast`
- You can then interact with the blockchain API methods as documented in the code

## Docker
You can run a node as a docker container.
- First, build the container using: `docker build .`. This will generate a random container ID.
- Then, you can run the node by specifying a port (such as 8080): `export PORT=8000 && docker run -e PORT=$PORT --expose $PORT -p $PORT:$PORT <CONTAINER-ID>`
- This will spin up a node you on your port that you can make requests to

# Simple Blockchain with Proof-of-Work
This project implements a simple blockchain in JavaScript with a Proof-of-Work (PoW) consensus mechanism. The blockchain supports basic operations such as creating transactions, mining blocks, and validating the chain. Additionally, it includes dynamic difficulty adjustment and average hash rate calculation for more realistic mining simulation.

## Features
Blockchain Structure: The blockchain consists of blocks and transactions, each block containing a hash of the previous block, a list of transactions, a nonce, and its own hash.
Proof-of-Work: This consensus mechanism ensures the security of the blockchain by requiring miners to solve a computationally difficult problem to add a new block.
Dynamic Difficulty Adjustment: The difficulty of the PoW problem adjusts dynamically based on the average time taken to mine recent blocks.
Average Hash Rate Calculation: The system computes the average time taken to mine blocks to help adjust the mining difficulty and analyze the performance of the blockchain.

## Getting Started

Prerequisites

Node.js: Ensure that Node.js is installed on your machine.
npm (Node Package Manager): npm should be installed along with Node.js.

Installation

Clone the Repository: Clone the project repository to your local machine using a Git command.
Navigate to Project Directory: Change your working directory to the project directory.
Install Dependencies: Use npm to install the required dependencies for the project.

Running the Simulation

You can run a simulation to see the blockchain in action. This simulation will create random transactions and mine new blocks, displaying the state and validity of the blockchain.

## Project Structure
Main File: The main file is used to run the blockchain simulation.
Blockchain Implementation: The blockchain logic, including block and transaction structure, PoW, difficulty adjustment, and validation, is implemented in the project.

## Usage

Creating a Transaction

You can create new transactions by specifying the amount, sender, and recipient. These transactions are added to a list of pending transactions to be included in the next mined block.

Mining a Block

Mining involves finding a nonce that satisfies the PoW condition (e.g., producing a hash with a certain number of leading zeros). Once mined, the block is added to the blockchain, and the list of pending transactions is reset.

Validating the Blockchain

Validation involves checking each block's stored hash against the computed hash and ensuring the integrity of the chain by verifying the hashes link correctly.

Example Usage

An example is provided to demonstrate how to create transactions, mine blocks, and validate the blockchain. It shows the state of the blockchain and confirms its validity.

# Output
```plaintext
node .\Blockchain.js
Average time to mine a block: 0.02825 seconds
Increasing difficulty to 4
Average time to mine a block: 0.43340000000000006 seconds
Increasing difficulty to 5
Average time to mine a block: 0.47000000000000003 seconds
Increasing difficulty to 6
Blockchain {
  chain: [
    Block {
      index: 0,
      timestamp: 1718063940,
      transactions: [],
      prevHash: '0',
      hash: '3a17d38f56ca57a0af46641df698103964e32832fafb27419a19232fe42e64a6',
      nonce: '0'
    },
    Block {
      index: 1,
      timestamp: 1718063940,
      transactions: [],
      prevHash: '3a17d38f56ca57a0af46641df698103964e32832fafb27419a19232fe42e64a6',
      hash: '000228c688c936ff0c3f135c2f25017971607e572c038848a3e50b0ddfd9ca9b',
      nonce: 10912
    },
    Block {
      index: 2,
      timestamp: 1718063940,
      transactions: [
        Transaction {
          amount: 669,
          sender: 'e4943',
          recipient: '88ed6',
          tx_id: '9cf950cffa374becbda0edf298331d2d'
        },
        Transaction {
          amount: 137,
          sender: 'da322',
          recipient: '8b851',
          tx_id: '8bc3d344fc1347688cb2b2108142283e'
        },
        Transaction {
          amount: 343,
          sender: '3e20e',
          recipient: 'cd4a3',
          tx_id: 'd76aa0bc10484d0080ed4c10fb2b6c50'
        },
        Transaction {
          amount: 218,
          sender: 'a0339',
          recipient: '1612c',
          tx_id: '85dd3204819a4935977e55eedf74dfbe'
        }
      ],
      prevHash: '000228c688c936ff0c3f135c2f25017971607e572c038848a3e50b0ddfd9ca9b',
      hash: '000b50f9195ab98a23d220fb6704676cbf6fc8b7487ccf62c1868e145d4c32ea',
      nonce: 219
    },
    Block {
      index: 3,
      timestamp: 1718063940,
      transactions: [
        Transaction {
          amount: 936,
          sender: '11483',
          recipient: '0fb08',
          tx_id: 'ec60164b9c95437cbbc230a3d152a780'
        },
        Transaction {
          amount: 907,
          sender: 'c0d8c',
          recipient: 'b9e88',
          tx_id: 'fd9320af248f48fca93ccecc3426f86e'
        },
        Transaction {
          amount: 405,
          sender: 'e5f48',
          recipient: 'f2103',
          tx_id: '5c11e895c6f6437d9bc987126127fe66'
        }
      ],
      prevHash: '000b50f9195ab98a23d220fb6704676cbf6fc8b7487ccf62c1868e145d4c32ea',
      hash: '000d77096f2b7ea29bb5d0c3d6c4b4ca66f3f13a2a65a64f281b42079b4254bf',
      nonce: 18786
    },
    Block {
      index: 4,
      timestamp: 1718063940,
      transactions: [],
      prevHash: '000d77096f2b7ea29bb5d0c3d6c4b4ca66f3f13a2a65a64f281b42079b4254bf',
      hash: '0003f641248617fa739b531590ea9bf895ef64f5674d18f7b7d8b04bc1fe3705',
      nonce: 3816
    },
    Block {
      index: 5,
      timestamp: 1718063941,
      transactions: [],
      prevHash: '0003f641248617fa739b531590ea9bf895ef64f5674d18f7b7d8b04bc1fe3705',
      hash: '00005386668f45e0e795c55435f63ae34cf3874152a3a15725bbcf503220a881',
      nonce: 186293
    },
    Block {
      index: 6,
      timestamp: 1718063941,
      transactions: [
        Transaction {
          amount: 653,
          sender: 'f0ecc',
          recipient: '04a29',
          tx_id: 'b3271b12d0994ed39ff77dfcebf4b1d9'
        },
        Transaction {
          amount: 306,
          sender: 'f24cc',
          recipient: '3c064',
          tx_id: 'fb8b48786a614ace8780d6580c9e96aa'
        }
      ],
      prevHash: '00005386668f45e0e795c55435f63ae34cf3874152a3a15725bbcf503220a881',
      hash: '00000d0f0e8345ad1e9a5b8ea2b155cb1de03fec6fedc4feddd14061036a2389',
      nonce: 103049
    },
    Block {
      index: 7,
      timestamp: 1718063942,
      transactions: [
        Transaction {
          amount: 71,
          sender: '3d8f7',
          recipient: '8d7b6',
          tx_id: 'cfd21b1afbdd4286a7a664752a799419'
        }
      ],
      prevHash: '00000d0f0e8345ad1e9a5b8ea2b155cb1de03fec6fedc4feddd14061036a2389',
      hash: '00003ee456af8a6bee47c8a15e487cfefa526c93c59a0d55b18a95f557c8f132',
      nonce: 101697
    },
    Block {
      index: 8,
      timestamp: 1718063942,
      transactions: [
        Transaction {
          amount: 288,
          sender: '6b1da',
          recipient: '4699e',
          tx_id: '0860d43cee764251a0fb532a1f009250'
        },
        Transaction {
          amount: 291,
          sender: '04ce9',
          recipient: '50b8d',
          tx_id: '97e5ae0a5d644d6687d7ef70fdb78019'
        }
      ],
      prevHash: '00003ee456af8a6bee47c8a15e487cfefa526c93c59a0d55b18a95f557c8f132',
      hash: '00000fd7c9b362d7f341b0dfaa63602f70c2ea0a34a89928ccf28a71573c4a7d',
      nonce: 3055
    },
    Block {
      index: 9,
      timestamp: 1718063942,
      transactions: [
        Transaction {
          amount: 342,
          sender: '10401',
          recipient: '73ee3',
          tx_id: '98311ac981e94a1daa18dd39fd2218c5'
        },
        Transaction {
          amount: 114,
          sender: '68abf',
          recipient: '23cab',
          tx_id: '74cdfcb7ed114a2fb45b5038724ce9ac'
        }
      ],
      prevHash: '00000fd7c9b362d7f341b0dfaa63602f70c2ea0a34a89928ccf28a71573c4a7d',
      hash: '000084bdab5473da37abca63ca1aac4989a69b6a7d40a65f9025f48aa82e3508',
      nonce: 278047
    },
    Block {
      index: 10,
      timestamp: 1718063943,
      transactions: [
        Transaction {
          amount: 491,
          sender: '5a481',
          recipient: 'd2259',
          tx_id: 'a7d917e0a3fd43ae88a1d7b28c0e609b'
        },
        Transaction {
          amount: 125,
          sender: 'f9bc3',
          recipient: '676a1',
          tx_id: '69e52a4112bc43b893c642b7d8b7d91c'
        }
      ],
      prevHash: '000084bdab5473da37abca63ca1aac4989a69b6a7d40a65f9025f48aa82e3508',
      hash: '00000e40cf4f4a5d7900c357d336e420685677740b3d6e52dbe9ef0380301f9d',
      nonce: 238487
    },
    Block {
      index: 11,
      timestamp: 1718063944,
      transactions: [
        Transaction {
          amount: 651,
          sender: 'b9bbb',
          recipient: '4d24d',
          tx_id: '007eec4068c940b2bfaaadea8c1a2f07'
        },
        Transaction {
          amount: 453,
          sender: '02c4d',
          recipient: '70c04',
          tx_id: '0c6de9b697e145b3be6a8d85c4ae0408'
        },
        Transaction {
          amount: 94,
          sender: '74971',
          recipient: '0c7a7',
          tx_id: '271668a06bca4a3fa8df25e43dee64f8'
        },
        Transaction {
          amount: 820,
          sender: 'a135a',
          recipient: 'c4e53',
          tx_id: '9f24e7178adc481c9527f96487c1b8ce'
        }
      ],
      prevHash: '00000e40cf4f4a5d7900c357d336e420685677740b3d6e52dbe9ef0380301f9d',
      hash: '00000fed7d403ac37691af756ff62270c27daa45d26c2a576c867b1d2cbcf552',
      nonce: 137680
    },
    Block {
      index: 12,
      timestamp: 1718063944,
      transactions: [
        Transaction {
          amount: 459,
          sender: '77701',
          recipient: '85dfb',
          tx_id: '85e9408469d74b0eb6ee42f2cdc4a83d'
        },
        Transaction {
          amount: 85,
          sender: 'a854b',
          recipient: '975bb',
          tx_id: 'a98ddae0c33f4adbbcf1490078c9a8be'
        },
        Transaction {
          amount: 268,
          sender: 'd8893',
          recipient: 'daa60',
          tx_id: '1f63f7a6e2d145b4b8b72adfbade0bff'
        }
      ],
      prevHash: '00000fed7d403ac37691af756ff62270c27daa45d26c2a576c867b1d2cbcf552',
      hash: '000008dc5cb13655450599db17e7bd7714d332a13828f5a683e82f4f9f47725e',
      nonce: 280388
    },
    Block {
      index: 13,
      timestamp: 1718063945,
      transactions: [
        Transaction {
          amount: 834,
          sender: '195ee',
          recipient: '5c576',
          tx_id: '8ff1267fd7734f05951825ae4a6ef119'
        },
        Transaction {
          amount: 205,
          sender: '4a65f',
          recipient: '47b11',
          tx_id: 'aeb9e0db098346c1afd4d81cb5658844'
        },
        Transaction {
          amount: 93,
          sender: '6ec01',
          recipient: '7dca4',
          tx_id: 'b98c5a7ae0334544a2111f3124d43236'
        }
      ],
      prevHash: '000008dc5cb13655450599db17e7bd7714d332a13828f5a683e82f4f9f47725e',
      hash: '0000002d19a2ceb6779bf153420d6ecca15de2323362e2990bc313d86e668995',
      nonce: 144464
    },
    Block {
      index: 14,
      timestamp: 1718063945,
      transactions: [
        Transaction {
          amount: 753,
          sender: '0398f',
          recipient: 'c1d82',
          tx_id: '034e33612da04238bebccc47101b51fd'
        },
        Transaction {
          amount: 785,
          sender: '42959',
          recipient: '7f704',
          tx_id: '671e13db3e4240f18425890000c11a96'
        },
        Transaction {
          amount: 431,
          sender: '6e982',
          recipient: '15eb4',
          tx_id: '6710b49f2f5d4f319b593ca154f09638'
        },
        Transaction {
          amount: 448,
          sender: '55f7b',
          recipient: '3f336',
          tx_id: 'c509445390df419aa252a3db2eba6c52'
        }
      ],
      prevHash: '0000002d19a2ceb6779bf153420d6ecca15de2323362e2990bc313d86e668995',
      hash: '00000df9ae4aee6499ff0c7b9e9b12bfc614a923b3df4f9937436e81427fd079',
      nonce: 37688
    },
    Block {
      index: 15,
      timestamp: 1718063948,
      transactions: [
        Transaction {
          amount: 516,
          sender: 'bc598',
          recipient: 'ac891',
          tx_id: 'df89438bf7c04320b58249774b97dc3a'
        },
        Transaction {
          amount: 521,
          sender: 'c76d3',
          recipient: 'a3e57',
          tx_id: '4662f4c5751642b181f63e58cdb2671f'
        }
      ],
      prevHash: '00000df9ae4aee6499ff0c7b9e9b12bfc614a923b3df4f9937436e81427fd079',
      hash: '00000060271edf4fbe5146ac5e04da57a0d35f952d2d781378280b80bae8fbe5',
      nonce: 1324663
    }
  ],
  pendingTransactions: [],
  difficulty: 6,
  blockTime: [ 3.685 ],
  adjustmentInterval: 5
}
******** Validity of this blockchain:  true
```#   p o w - b l o c k c h a i n  
 