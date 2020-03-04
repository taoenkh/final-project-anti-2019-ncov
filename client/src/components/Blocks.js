import React, { Component } from 'react';

class Blocks extends Component {
    //state = {shard: []};
    state = {blocks: []};

    componentDidMount(){
        fetch('http://localhost:3001/blocks')
        .then(response=> response.json())
        .then(json=>this.setState({blocks: json}));

    }
    render(){
        console.log('this.state', this.state);
        return(
            <div>
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
                                                    <div key={shard.hash} className = 'Block'>{shard.hash}</div>
                                                    
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