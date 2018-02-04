import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getByCategory } from '../actions/postsAction';
import Post from './Post';
import NewPost from './NewPost';
import BackButton from './common/BackButton';
import FiterSelector from './filterSelector';

class Categories extends Component{

    state = {
        category : '',
        filterSelected : 0
    }

    _getPosts(category){
        this.props.getByCategory(category);
    }
    componentDidMount(){
        const {category} = this.props.match.params;
        this.setState({category});
        this._getPosts(category);
    }

    _onPostClick(post){
        this.props.history.push(`${post.category}/${post.id}`)
    }

    _renderPosts(){
        const { posts } = this.props;
        const { filterSelected } = this.state;
        const filter = {
            0 : 'voteScore',
            1 : 'timestamp'
        }

        return !posts?null:posts.sort((a, b)=>b[filter[filterSelected]] - a[filter[filterSelected]])
                                .map((post)=><Post 
                                                onClick={()=>this._onPostClick(post)} 
                                                postId={post.id} 
                                                key={post.id} 
                                                showControls={true}/>)
    }

    _onSort(filterSelected){
        this.setState({filterSelected})
    }

    render() {
        const { category } = this.state
        return (
            <div>
                <FiterSelector 
                    onSelect={this._onSort.bind(this)} 
                    selected={this.state.filterSelected}
                />
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