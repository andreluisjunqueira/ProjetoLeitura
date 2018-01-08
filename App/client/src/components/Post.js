import React, { Component } from 'react';
import {ptbr} from '../utils/formatDate';
import { connect } from 'react-redux';
import { votePost, deletePost } from '../actions/postsAction';
import { Controls, Votes } from './common';
import { Modal } from './common';
import PostForm from './PostForm';
import { withRouter } from 'react-router-dom';

class Post extends Component{

    state = {
        isOpen : false,
        postToEdit : null
    }


    showPostModal(){
        let { postToEdit } = this.state;
        const { user } = this.props;

        if(!postToEdit && user)
            postToEdit = {author : user}
            
        this.setState({isOpen : true, postToEdit});
    }

    hidePostModal(){
        this.setState({isOpen : false, postToEdit : null});
    }

    onPostVote(data){
        this.props.votePost(data)
    }

    onPostEdit(post){
        this.setState({postToEdit : post},()=>{
            this.showPostModal()
        });
    }
    onDeletePost(id){
        const { deletePost, history,match:{params} } = this.props;
        deletePost(id,()=>{
            if(params.category)
                history.push('/');
        })
    }

    onRequestCloseModal(){
        this.setState({postToEdit : null})
    }

    render(){
        const { post, onPostVote, onClick, showControls } = this.props;
        return !post ? null : (
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
                                            onDelete={(id)=>this.onDeletePost(id)}
                                            onEdit={(item)=>this.onPostEdit(item)}
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
                                        <span style={{fontSize : 12}}><Votes item={post} onVote={this.onPostVote.bind(this)}/></span>
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

            <Modal
                isOpen={this.state.isOpen}
                onRequestClose={()=>this.onRequestCloseModal()}>
                    <PostForm 
                        onCancel={()=>this.hidePostModal()}
                        editData={this.state.postToEdit}
                        onSubmit={()=>{this.setState({isOpen:false})}}
                    />
                </Modal>
        </div>
        )
    }
}

const mapStateToProps = ({posts, comments, user}, {postId})=>{
    const _post = posts.posts[postId] || posts.postsCategory[postId];
    return{
        post : _post,
        user
    }
}

Post.defaultProps = {
    showControls : true,
    onClick : ()=>{}
}

export default connect(mapStateToProps, {votePost, deletePost})( withRouter(Post) )