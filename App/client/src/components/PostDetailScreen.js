import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllPosts } from '../actions/postsAction';
import { getByPost, newComment, deleteComment, editComment, voteComment } from '../actions/commentsAction';
import Post from './Post';
import Comment from './Comment';
import BackButton from './common/BackButton';


class PostDetail extends Component{

    state = {
        body: '',
        author : '',
        commentId : '',
        parentId : ''
    }
    componentDidMount(){
        const { id } = this.props.match.params;
        const { user } = this.props;
        let author = user ? user : ''
        this.setState({parentId : id, author});
        this.props.getAllPosts();
        this.props.getByPost(id);
    }

    _onChange(field, value){
        this.setState({[field]: value});
    }

    _onSubmitComment(evt){
        evt.preventDefault();
        let fn = this.props.newComment;

        if(this.state.commentId)
            fn = this.props.editComment;   
        
        fn(this.state,()=>{
            this.setState({
                body: '',
                author : '',
                commentId : ''
            });
            this.props.getByPost(this.state.parentId)
        })
    }

    _onDeleteComment(id){
        this.props.deleteComment(id,()=>{
            this.props.getByPost(this.state.parentId);
        })
    }

    _onEditComment(comment){
        const { body, author, id } = comment;
        this.setState({
            body,
            author,
            commentId : id
        })
    }

    _onVoteComment(option){
        this.props.voteComment(option,()=>{
            this.props.getByPost(this.state.parentId);
        })
    }

    render(){
        const { comments, error, history } = this.props;
        const { body, author, parentId } = this.state;
        if(error)
            return(
                <div style={{display:'flex', justifyContent:'center', marginTop : 100}}>
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <div>
                            <h4>{error}</h4>
                        </div>
                        <div>
                        <a style={{display:'flex',  cursor:'pointer'}} onClick={()=>history.push('/')}>
                            <i className="material-icons" style={{fontSize : 22}}>arrow_back</i>
                            Back
                        </a>
                        </div>
                    </div>
                </div>
            )
        return (
            <div>
                <BackButton {...this.props}/>
                <Post 
                    postId={parentId}
                    showControls={true}
                />
                <form onSubmit={this._onSubmitComment.bind(this)}>
                    <div className='row'>
                        <div className="input-field col s8">
                            <textarea className="materialize-textarea validate" value={body} onChange={(evt)=>this._onChange('body',evt.target.value)} placeholder='Escreva um comentário'></textarea>
                        </div>
                        <div className="input-field col s4" style={{marginTop:48}}>
                            <input type="text" className="validate" value={author} onChange={(evt)=>this._onChange('author',evt.target.value)} placeholder='Author' />
                        </div>
                    </div>
                    <input type='submit' style={{display:'none'}}/>
                </form>
                <p>Comments</p>
                <Comment 
                    comments={comments}
                    onDelete={(id)=>this._onDeleteComment(id)}
                    onEdit={(comment)=>this._onEditComment(comment)}
                    onVote={(option)=>this._onVoteComment(option)}
                />
            </div>
        )
        // const { post } = this.props;
        // return !post.post?null:<Post post={this.props.post.post}/>
    }
}

const mapStateToProps = ({comments, posts, user},{history, ...rest})=>{
    const { id } = rest.match.params;
    let error = '';
    if(!posts.posts[id])
        error = 'This post is no longer available. :(' 

    return{
        comments,
        error,
        user
    }
}
export default connect(mapStateToProps,{ getAllPosts, newComment, getByPost, deleteComment, editComment, voteComment })(PostDetail);