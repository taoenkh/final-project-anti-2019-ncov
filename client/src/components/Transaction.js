import React, { Component } from 'react';


class Transaction extends Component{
	state = { transactions: [] };

	componentDidMount() {
		fetch('http://localhost:3001/transactions')
		.then(response => response.json())
		.then(json => this.setState({transactions: json}));
    }
    render() {
		console.log(this.state.transactions);
		return (
			<div>
				{
					this.state.transactions.map(transaction=>{
						return(
							<div>
								<div>Initial Amount: {transaction.input.amount}</div>
								{
									transaction.outputs.map(pool=>{
										if (pool.address != transaction.input.address)
											return(
												<div>transaction:{pool.amount}</div>
											)
										else
											return(
												<div>balance:{pool.amount}</div>
											)
									})
								}
								
							</div>
						)
					})
				}
			</div>
		);
	}
}

export default  Transaction;