import React from 'react';


const Votes = (props)=>{

    function _vote(data){
            props.onVote(data)
    }

    const { item } = props;

    return(
        <div className="row">
            <div className="col s1" style={{marginRight : 0}}>
                <a onClick={()=>_vote({id : item.id, option: 'upVote'})} style={{cursor:'pointer'}}>
                    <i className="material-icons" style={{fontSize :16, marginRight : -15}}>thumb_up</i>
                </a>
            </div>
            <div className="col s1">
                <a onClick={()=>_vote({id : item.id, option: 'downVote'})} style={{cursor:'pointer'}}>
                    <i className="material-icons" style={{fontSize :16, marginRight : -15}}>thumb_down</i>
                </a>
            </div>
            <div className="col s4">
                {item.voteScore} votes
            </div>
        </div>
    )
}

Votes.defaultProps  = {
    onVote :()=>{},
    item : {}
}

export default Votes;
    