import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getByCategory } from '../actions/postsAction';
import Post from './Post';
import NewPost from './NewPost';
import BackButton from './common/BackButton';

class Categories extends Component{

    state = {
        category : ''
    }
    _getPosts(category){
        this.props.getByCategory(category);
    }
    componentDidMount(){
        const {category} = this.props.match.params;
        this.setState({category});
        this._getPosts(category);
    }

    _renderPosts(){
        const { posts } = this.props;
        return !posts?null:posts.sort((a, b)=>b.voteScore - a.voteScore)
        .map((post ,index)=><Post postId={post.id} key={index} showControls={false}/>)
    }

    render() {
        const { category } = this.state
        return (
            <div>
                <div className="row">
                    <div className="col s11">
                        <h3>{this.state.category.toUpperCase()}</h3>
                    </div>
                    <div className="col s1">
                        <BackButton {...this.props}/>
                    </div>
                </div>
                <NewPost 
                    category={category} 
                    onCreatePost={()=>this._getPosts(category)}
                />
                {this._renderPosts()}
            </div>
        )
    }
}

const mapStateToProps = ({posts})=>{
    const _posts = posts.postsCategory?Object.values(posts.postsCategory):[];
    return{
        posts : _posts
    }
}

export default connect(mapStateToProps, {getByCategory})(Categories)