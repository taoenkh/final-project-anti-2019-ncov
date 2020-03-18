import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import history from '../history';

const POLL_INTERVAL_MS= 10000;

class TransactionPool extends Component{
	state = { transactions: {} };

	fetchTransactionPoolMap = () => {
		//fetch('http://localhost:3001/transactions')
		fetch(`${document.location.origin}/transactions`)
		
		.then(response => response.json())
		.then(json => this.setState({transactions: json}));
	}
	fetchMineTransactions=()=>{
		fetch(`${document.location.origin}/mine-transactions`)
		.then(response => {
			if(response.status===200){
				alert('success');
				history.push('./shardchain');

			}
			else{
				alert('The mine-transaction block request did not complete');
			}
		});
	}
	
	componentDidMount() {
		this.fetchTransactionPoolMap();
		setInterval(
			()=>this.fetchTransactionPoolMap(),
			POLL_INTERVAL_MS
		);
	}
	componentWillUnmount(){
		clearInterval(this.fetchPoolMapInterval);

		

	}

    render() {
		console.log(this.state.transactions);
		return (
			<div className='TransactionPool'>
				<div><Link to='/'>Home</Link></div>
				<h3>Transaction Pool</h3>
				{
					Object.values(this.state.transactions).map(transaction=>{
						return(
							<div key={transaction.id}>
								<hr />
								<div>Initial Amount: {transaction.input.amount}</div>
								{
									transaction.outputs.map(pool=>{
										if (pool.address != transaction.input.address)
											return(
												<div>To: {`${pool.address.substring(0,20)}...`} | Sent: {pool.amount}</div>
											)
										else
											return(
												<div>From: {`${pool.address.substring(0,20)}...`} | Balance: {pool.amount}</div>
											)
									})
								}
								
							</div>
						)
					})
				}
				<hr />
				<Button
					bsStyle='danger'
					onClick={this.fetchMineTransactions}
				>
					Mine the Transaction

				</Button>
			</div>
		);
	}
}

export default  TransactionPool;