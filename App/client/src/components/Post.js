import React from 'react';
import {ptbr} from '../utils/formatDate';
import { connect } from 'react-redux';
import { votePost, deletePost } from '../actions/postsAction';
import { Controls, Votes } from './common';

const Post = (props)=>{
    const { post, onPostVote, onClick, showControls } = props;
    if(!post) return null;

    function vote(option){
        props.votePost(option)
    }

    function onDeletePost(id){
        props.deletePost(id);
    }

    function editPost(item){
        props.onPostEdit(item);
    }

    return(
        <div className="row">
            <div className="col s12 m12">
                <div className="card">
                    <div className="card-content" >
                        <div className="row">
                            <span className="card-title">
                                <div className="col s10" onClick={onClick} style={{cursor : 'pointer'}}>
                                    <span style={{textDecoration:'underline'}}>{post.title}</span>
                                </div>
                                <div>{
                                    showControls?
                                    <Controls 
                                        item={post}
                                        onDelete={(id)=>onDeletePost(id)}
                                        onEdit={(item)=>editPost(item)}
                                    />:null}
                                </div>
                            </span>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <p>{post.body}</p>
                            </div>
                        </div>
                    </div>

                    <div className="card-action">
                        <div className='row'>
                            <div className='col s3'>
                                    <span style={{fontSize : 12}}>Author: {post.author}</span>
                                </div>
                                <div className='col s3'>
                                    <span style={{fontSize : 12}}><Votes item={post} onVote={vote.bind(this)}/></span>
                                </div>
                                <div className='col s3'>
                                    <span style={{fontSize : 12}}>Comments: {post.commentCount}</span>
                                </div>
                                <div className='col s3'>
                                    <span style={{fontSize : 12}}>{ptbr(post.timestamp)}</span>
                                </div>
                            </div>
                        </div>
                    <div>
                </div>
            </div>
        </div>
    </div>
    )
}

const mapStateToProps = ({posts, comments}, {postId})=>{
    const _post = posts.posts[postId] || posts.postsCategory[postId];
    return{
        post : _post
    }
}

Post.defaultProps = {
    showControls : true
}

export default connect(mapStateToProps, {votePost, deletePost})(Post)