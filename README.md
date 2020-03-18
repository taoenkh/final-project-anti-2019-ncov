# Final-project-anti-2019-ncov
# Getting Started
Our project utilizes `Node.js` and `Express.js` Framework for the Back-end server
## Prerequisites
To run the project, please make sure `Nodejs` and `npm` are installed.
The dependencies are all stored in `node-modules` and `package.json`
## Running single instance

`npm run dev`
The command above will start a server at port 5002 for the p2p network and port 3001 for the http network.
## Running multiple instances
Running multiple instances requires specifying the peers in the network.

To run the second node, we need to specify the HTTP port and p2p ports
For example, node 2 uses port 3002 as HTTP port, and 5003 as p2p port
`HTTP_PORT=3002 P2P_PORT=5003 PEERS=ws://localhost:5002 npm run dev`
To build more nodes, the p2p port of other nodes in the network must be specified.

# APIs

Our project supports `mining`, requesting `transactions`, getting `public-key`of the instance, viewing the transactions in `transaction` pool, and viewing the blockchain info.

## Mining
`GET` request on  
`ip_address:port/mine-transactions`
where `ip_address:port` is the instance about the mine a block

## Requesting transactions

`POST` request  
The body of the `POST` request must be in `application/json` format  
the `JSON` must be in the following format  
```json
{
    "public-key":" { public key of the node you are sending coins to} ",
    "amount":"{ the amount of coins you are sending }"
 }
 ```  
`ip_address:port/transact`  

where `ip_address:port` is the address of the sender

## Getting the public key

`GET` request  
`ip_address:port/public-key`  

The response will return the public-key of the instance with address `ip_address:port`, in `JSON` format.  

```json
{
    "public-key":"{the public key of the instance}"
}
```

## Viewing the transactions

This API will return the transactions in the transaction pool in `JSON` format.  

`ip_address:port/transactions`   


The response will be in `JSON` format.

## Viewing the Blockchain

`ip_address:port/blocks`

The response will be the entire blockchain in `JSON` format.
## Front-end App
The front-end UI was built using ReactJS, it is included all the API's listed above.
 To visit our front-end page, visiting `ip_address:port` on a browser will direct to the web page of node that certain node.   
 Mining, requesting transactions, viewing transaction pool, and viewing the blockchain are all supported in this front-end webpage.  
 Requesting transaction on `localhost:3001` is equivalent to `localhost:3001/transac`  
 
 
 ## Running the evaluation
 
 After installing the docker in local machine, running `docker-compose up -d` under the home directory will build 10 docker containers 
 to run the evaluation (1 client and 9 servers).
 
 




# Meeting 2
 Members | Tasks Done | Tasks In Progress | Issues
-------|---------- | ------------------ | ----------------
Jared Li | Created and finished `Block` class (https://github.com/ECS-251-W2020/final-project-anti-2019-ncov/commit/11be16d2ac13e267bf1666360af60c78e7456fae)| Improve `Block` class to adapt Quarkchain | None
Jiaqi Liu | Finished blockchain class as `index.js` (https://github.com/ECS-251-W2020/final-project-anti-2019-ncov/commit/a8d2f7eb71849a74526dfc0d50696e0a8c7c274f)| Modify `index` class to adapt specification of Quarkchain | None
Lihang Pan | Completed Peer-to-Peer Transaction (https://github.com/ECS-251-W2020/final-project-anti-2019-ncov/commit/7fdc17e7ca2a2b00d1388b4ce57a55dc03a1952e) , (https://github.com/ECS-251-W2020/final-project-anti-2019-ncov/commit/08017bd43faf49e8c7df0e6c6c3a4c8a724f685d) | Add `PoW` to the current blockchain | None
Shidi Yu | Unit test for block and blockchain class (https://github.com/ECS-251-W2020/final-project-anti-2019-ncov/commit/6a1064d0972f0042a3a2f07926fe8bbdcdc5a9c6) | Test `PoW`, wallet transaction, transaction pool and mine transaction | None
Tao Wang | Created Trello, readme, merged `PR`s and contributed to Peer-to-Peer Transaction part (https://github.com/ECS-251-W2020/final-project-anti-2019-ncov/commit/08017bd43faf49e8c7df0e6c6c3a4c8a724f685d)| Update next weeks progress and understand `QuarkChain` | None


# Meeting 3
 Members | Tasks Done | Tasks In Progress | Issues
-------|---------- | ------------------ | ----------------
Jared Li | Improved and finished Block.test and index.test class in blockchain folder https://github.com/ECS-251-W2020/final-project-anti-2019-ncov/commit/3ffd34f32f3095b3e24d214bdbbb44a13902c6ca  | Add functions to fit sharding | None
Jiaqi Liu | Updated `index.js` `miner.js` `p2p-server.js` https://github.com/ECS-251-W2020/final-project-anti-2019-ncov/commit/103abd3d3a1775f11e198d64dacd57f0b7677766  | Adjusting blockchain accordingly to the change of the new shard class | None
Lihang Pan |adding pow into the blockchain, create the transaction pool,  manage transactions( valid transaction, add transactions into the block, adding reward transaction to the miner) in the blockchain system. https://github.com/ECS-251-W2020/final-project-anti-2019-ncov/commit/90f732ff963114d57a0836df95152e3bb2540f65 | make the final demo| None
Shidi Yu | Unit test for block and blockchain. Wallet transaction, transaction pool and mine transaction class https://github.com/ECS-251-W2020/final-project-anti-2019-ncov/commit/7e375b436628024326ff6946ed8c13d2fcb60da0  | Implement frontend of the bitcoin system | None
Tao Wang | UpdatedTrello, readme, and contributed to `config.js`, `chain-utils.js`, and some of the wallet implementation https://github.com/ECS-251-W2020/final-project-anti-2019-ncov/commit/b62bc23800c7976a715b87570a441624e82569ac#diff-96bbaf75b685386d73e2f24e45f95cbc | Improve the current naive implementation of sharding | None


# Meeting 4
 Members | Tasks Done | Tasks In Progress | Issues
-------|---------- | ------------------ | ----------------
Jared Li | Improved and finished Block.test and index.test class in blockchain folder https://github.com/ECS-251-W2020/final-project-anti-2019-ncov/commit/3ffd34f32f3095b3e24d214bdbbb44a13902c6ca  | Add functions to fit sharding | None
Jiaqi Liu | Updated `index.js` `miner.js` `p2p-server.js` https://github.com/ECS-251-W2020/final-project-anti-2019-ncov/commit/103abd3d3a1775f11e198d64dacd57f0b7677766  | Adjusting blockchain accordingly to the change of the new shard class | None
Lihang Pan |make the final demo and finish the final project ppt| help with the evaluation| None
Shidi Yu | Unit test for block and blockchain. Wallet transaction, transaction pool and mine transaction class https://github.com/ECS-251-W2020/final-project-anti-2019-ncov/commit/7e375b436628024326ff6946ed8c13d2fcb60da0  | Implement frontend of the bitcoin system | None
Tao Wang | Updated Trello, readme, and contributed to python script performing making transactions and mining https://github.com/ECS-251-W2020/final-project-anti-2019-ncov.git | Writing a bash script to run multiple p2p serveres | None



















## Trello Link

https://trello.com/b/Goedf6yL/ecs-251-project
