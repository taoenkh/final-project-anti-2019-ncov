import React, {Component } from 'react';
import Blocks from './Blocks';
import logo from '../assets/blockchain.png';
import Transaction from './Transaction';


class App extends Component{
    state = {walletInfo: {address :'fooxv6', balance: 9999}};


    
    render(){
        const { address, balance}=this.state.walletInfo;
        return(
            <div>
                <img className='logo' src={logo}></img>
                <div>
                Welcome to the blockchain...
                </div>
                <br />
                <div>

                </div>
                
                <br />
                
                <Blocks />
                <Transaction />

            </div>
        );

    }
}

export default App;