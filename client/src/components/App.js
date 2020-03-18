import React, {Component } from 'react';
//import Blocks from './Blocks';
import { Link } from 'react-router-dom';
import logo from '../assets/bitcoin2.png';


class App extends Component{
    state = {walletInfo: {address :'fooxv6', balance: 9999}};


    
    render(){
        const { address, balance}=this.state.walletInfo;
        return(
            <div>
                <img className='logo' src={logo}></img>
                <br />
                <div>
                Welcome to the Sharded-Bitcoin
                </div>
                <br />
                <div><Link to='/shardchain'>Blocks</Link></div>
                <div><Link to='/conduct-transaction'>Conduct a Transaction</Link></div>
                <div><Link to='/transaction-pool'>Transaction Pool</Link></div>
                <div>

                </div>

            </div>
        );

    }
}

export default App;