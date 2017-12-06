import React from 'react';
import { connect } from 'react-redux';
import {ptbr} from '../utils/formatDate';
import { Votes } from './common';

const Comment = (props)=>{

    const _delete = (id)=>{
        props.onDelete(id);
    }

    const _vote = (data)=>{
        props.onVote(data)
    }

    const _edit = (comment)=>{
        props.onEdit(comment);
    }

    const _renderComments = ()=>{
    
        const { comments } = props;
        return !comments.length?<p>No comments to this post</p>:comments.sort((a,b)=>b.voteScore - a.voteScore).map((comment, index)=>{
            return(
                <div className='row' key={index}>
                    <span>
                        <div className="row">
                            <div className="col s10">
                                <p><b>{comment.author}</b>: {comment.body}</p>
                            </div>
                            <div className="col s2">
                                <a href='#' onClick={()=>_edit(comment)}><i className="material-icons" style={{fontSize :18, color : 'black'}}>create</i></a>
                                <a href='#' onClick={()=>_delete(comment.id)}><i className="material-icons" style={{fontSize :18, color:'black'}}>delete_forever</i></a>
                            </div>
                        </div>
                    </span>
                    <span>     
                        <div>
                            <div className='col s4'>
                                <Votes item={comment} onVote={(option)=>_vote(option)}/>
                            </div>
                            <div className='col s12'>
                                <p style={{fontSize:10}}>{ ptbr(comment.timestamp) }</p>
                            </div>
                        </div>
                    </span>
                </div>
            )
        })
    }
    return (
        <div className="card">
            <div className="card-content"> 
                {_renderComments()} 
            </div>
        </div>
        )
}
export default Comment;