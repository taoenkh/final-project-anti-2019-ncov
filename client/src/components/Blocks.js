import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Block from './Block';

class Blocks extends Component {
    //state = {shard: []};
    state = {blocks: []};

    componentDidMount(){
        fetch(`${document.location.origin}/blocks`)
        .then(response=> response.json())
        .then(json=>this.setState({blocks: json}));

    }
    render(){
        console.log('this.state', this.state);
        return(
            <div>
                <div><Link to='/'>Home</Link></div>
                <h3>Blocks</h3> 
                {
                   
                    
                    this.state.blocks.map(block=>{
                        return(
                            <div>
                                <div>------------------------------------------------------------------</div>
                                <div> Shardnum: {block.shardnum}</div>
                                    {
                                        block.shard.map(shard => {
                                            return(
                                                <div>
                                                    <div className="hangchain"></div>
                                                    <Block key={shard.hash} block ={shard}/>
                                                    
                                                </div>
                                            )
                                        })
                                    }
                                
                            </div>
                        )
                        
                           
                        
                    })

                }
            </div>
        )
             

        
    }
}
export default Blocks;