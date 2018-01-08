import React, { Component } from 'react';
import { connect } from 'react-redux';
import { savePost } from '../actions/postsAction';

class NewPost extends Component{

    state = {
        title : '',
        author : '',
        body : ''
    }

    componentDidMount(){
       const { user } = this.props;

       const author = user ? user : ''
       this.setState({author})
    }

    _onChange(field, value){
        this.setState({[field]:value});
    }

    _onSubmit(){
        const {category}=this.props;
        const post = {...this.state, ...{category}};
        
        if(this._postIsValid(post))
            this.props.savePost(post,()=>{
                this.props.onCreatePost()
                this.setState({
                    title : '',
                    author : '',
                    body : ''
                });
            });
    }

    _postIsValid(post){
        if(!post.title || !post.author || !post.category || !post.body){
            alert('Fill out every form fields before to submit !');
            return false;
        }
        return true;
    }

    render(){
        return(
            <div className="card">
                <div className="card-content" >
                    <div className="row">
                        <div className="col s12">
                            <div className="row">
                                <div className="input-field col s6">
                                    <input placeholder="Title" id="title" type="text" className="validate" onChange={(evt)=>this._onChange('title',evt.target.value)} value={this.state.title}/>
                                    <label htmlFor="title">Title</label>
                                </div>
                                <div className="input-field col s6">
                                    <input placeholder="Author" id="author" type="text" className="validate" onChange={(evt)=>this._onChange('author',evt.target.value)} value={this.state.author}/>
                                    <label htmlFor="author">Author</label>
                                </div>
                                <div className="input-field col s12">
                                    <textarea placeholder="Write yout post" id="body" type="text" className="materialize-textarea validate" onChange={(evt)=>this._onChange('body',evt.target.value)} value={this.state.body}></textarea>
                                    <label htmlFor="body"></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-action">
                        <div className='row'>
                            <a className="waves-effect waves-light btn" onClick={()=>this._onSubmit()}>Post</a>
                        </div>
                    </div>
                <div>
            </div>
        </div>
        )
    }
}

NewPost.defaultProps = {
    onCreatePost : ()=>{}
}
 
export default connect( ({user})=>({user}) , {savePost})(NewPost)