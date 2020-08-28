# Final-project-anti-2019-ncov
# Getting Started
Our project utilizes `Node.js` and `Express.js` Framework for the Back-end server
# Project structure
```
├── README.md
├── app (The main backend application including p2p server)
│   ├── index.js
│   ├── miner.js
│   └── p2p-server.js
├── blockchain (The data structure of blockchain, and validation of blocks)
│   ├── Shard.js
│   ├── block.js
│   ├── block.test.js
│   ├── index.js
│   └── index.test.js
├── chain-util.js
├── client (The front-end application)
│   ├── dist
│   └── src
│       ├── assets
│       ├── components
│       │   ├── App.js
│       │   ├── Block.js
│       │   ├── Blocks.js
│       │   ├── ConductTransaction.js
│       │   └── TransactionPool.js
│       ├── history.js
│       ├── index.css
│       ├── index.html
│       └── index.js
├── cmd.txt
├── config.js (Configuration file of back-end server)
├── createcommand.py
├── davis-chain.zip
├── dev-test.js
├── docker-compose.yml
├── dump.rdb
├── ip.txt
├── package-lock.json
├── package.json
├── request.py
├── result.txt
├── wallet (Data structure and logic of transactions)
│   ├── index.js 
│   ├── index.test.js
│   ├── transaction-pool.js
│   ├── transaction-pool.test.js
│   ├── transaction.js
│   └── transaction.test.js
```
The project is built using `node.js`, with numerous dependencies.

For testing purpose, a suggested way of running the project is directly unzipping the `davis-chain.zip`.  
It will provide a `node-module` with all the dependencies installed.
## Configurations

Inside `config.js` the `SHARDNUM`, `DIFFICULTY`, `MINING_REWARD` are all parameters that can be modified.  



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
 Requesting transaction on `localhost:3001` is equivalent to `localhost:3001/transact`, or you can just click on the links we already provided on the page.
 
 
 ## Running the evaluation
 
 After installing the docker in local machine, running `docker-compose up -d` under the home directory will build 10 docker containers 
 to run the evaluation (1 client and 9 servers).
 
 After running the instances run `docker ps -aq | xargs -n 1 docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' > ip.txt` to store the IP addresses of 10 containers.  
 
 Then reorder the IP addresses based on the order of `docker ps`.
 The order of the IP addresses must be 
 ```
 s1
 s2
 s3
 s4
 s5
 s6
 s7
 s8
 s9
 c1
 ```
 
 running `python createcommand.py` to generate a `cmd.txt` file with the command of running the p2p server.
 ## Running instances of Docker
 
 Open 10 terminals and run `docker exec -it {container name} bash`
 
 In the client container run   
 `apt-get install python3`  
 `apt-get install python3-pip`
 `pip install requests` to install the libraries require to run the script.
 
 `python3 request.py` will run the evaluation.
 
 
 





