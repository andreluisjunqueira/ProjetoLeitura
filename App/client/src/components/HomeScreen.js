import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCategories } from '../actions/categoriesAction';
import { getAllPosts, votePost } from '../actions/postsAction';
import Post from './Post';
import { Modal } from './common';
import PostForm from './PostForm';

import FiterSelector from './filterSelector';

class Home extends Component{

    constructor(props){
        super(props);

        this.state = {
            isOpen : false,
            filterSelected : 0,
            postToEdit : null
        }
    }

    componentDidMount(){
        this.props.getAllPosts();
        this.props.getCategories();
    }

    _renderCategories(){
        const { categories } = this.props;
        if(categories.length<1) return null;
        return categories.map((category,index)=>{
            return(
                <li className="collection-item" key={index}>
                    <Link to={'categories/'+category.path}>{category.name}</Link>
                </li>
            )
        })
    }
   
    _onPostVote(data){
        this.props.votePost(data,()=>{
        })
    }
    _onPostEdith(post){
        this.setState({postToEdit : post},()=>{
            this._showPostModal()
        });
    }

    _onPostClick(id){
        this.props.history.push('post/'+id)
    }

    _renderPosts(){
        const { posts } = this.props;
        if(!posts || posts.length<1) return null;
        const { filterSelected } = this.state;
        const filter = {
            0 : 'voteScore',
            1 : 'timestamp'
        }
        return posts.sort((a, b)=>b[filter[filterSelected]] - a[filter[filterSelected]])
            .map(post=><Post 
                        onClick={()=>this._onPostClick(post.id)} 
                        postId={post.id} 
                        key={post.id} 
                        onPostVote={this._onPostVote.bind(this)} 
                        onPostEdit={this._onPostEdith.bind(this)}/>)
    }

    _showPostModal(){
        this.setState({isOpen : true});
    }
    _hidePostModal(){
        this.setState({isOpen : false, postToEdit : null});
    }
    _onSort(filterSelected){
        this.setState({filterSelected})
    }
    _onRequestCloseModal(){
        this.setState({postToEdit : null})
    }

    render(){
        return(
            <div>
                <FiterSelector onSelect={this._onSort.bind(this)} selected={this.state.filterSelected}/>
                <div className="row">
                    <div className="col s8">
                        <div>
                            { this._renderPosts() }
                        </div>
                    </div>
                    <div className="col s4">
                        <ul className="collection with-header">
                            <li className="collection-header"><h4>Categories</h4></li>
                            { this._renderCategories() }
                        </ul>
                    </div>
                </div>
                <div className="fixed-action-btn vertical">
                    <a className="btn-floating btn-large red">
                        <i className="large material-icons">add</i>
                    </a>
                    <ul>
                        <li>
                            <a className="btn-floating blue" onClick={()=>this._showPostModal()}>
                                <i className="material-icons">format_quote</i>
                            </a>
                        </li>
                    </ul>
                </div>
                <Modal
                    isOpen={this.state.isOpen}
                    onRequestClose={()=>this.onRequestCloseModal()}
                >
                    <PostForm 
                        onCancel={()=>this._hidePostModal()}
                        editData={this.state.postToEdit}
                        onSubmit={()=>{this.setState({isOpen:false})}}
                        />
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = ({categories, posts, form})=>{

    const _posts = posts.posts?Object.values(posts.posts):[];

    return{
        categories,
        posts : _posts
    }
}

export default connect(mapStateToProps, { getCategories, getAllPosts, votePost } )(Home);