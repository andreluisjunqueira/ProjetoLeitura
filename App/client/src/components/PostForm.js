import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { Button } from 'react-materialize';
import { SelectInput } from './common';
import { savePost, updatePost } from '../actions/postsAction';

class PostForm extends Component{

    state = {
        title : '',
        author:'',
        category:'',
        body:'',
        id:''
    }
    componentDidMount() {

        const {editData} = this.props;
        if(editData){
            this.setState({
                id : editData.id,
                author : editData.author,
                category : editData.category,
                body : editData.body,
                title : editData.title,
            })
        }
    }

    _onSubmitForm(evt){
        evt.preventDefault();

        let fn = this.props.savePost;
        if(this.state.id)
            fn = this.props.updatePost;    

        fn(this.state,()=>{
            this.setState({
                title : '',
                author:'',
                category:'',
                body:'',
                id:''
            },this.props.onSubmit)
        })
    }

    _onFormChange(field, value){
        this.setState({
            [field] : value
        })
    }

    render(){
        const { onCancel } = this.props;
        return(
            <div className="row">
                <form className="col s12" onSubmit={this._onSubmitForm.bind(this)}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input type="text" className="validate" id="title" placeholder='Title' onChange={({target})=>this._onFormChange('title',target.value)} value={this.state.title}/>
                            <label htmlFor="title">Title</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <SelectInput onChange={({target})=>this._onFormChange('category', target.value)} value={this.state.category}/>
                        </div>
                        <div className="input-field col s6">
                            <input type="text" className="validate" id="author" onChange={({target})=>this._onFormChange('author',target.value)} value={this.state.author}/>
                            <label htmlFor="author">Author</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <textarea className="materialize-textarea validate" onChange={({target})=>this._onFormChange('body',target.value)} value={this.state.body}>
                            </textarea>
                            <label htmlFor="content">Content</label>
                        </div>
                    </div>
                    <div style={{position:'absolute',right:0, left:0, bottom:20}}>
                        <div style={{display:'flex', justifyContent : 'space-around'}}>
                            <div>
                                <Button onClick={onCancel}>Cancel</Button>
                            </div>
                            <div>
                                <Button className='red'>Publish</Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

PostForm.defaultProps = {
    onSubmit : ()=>{}
}

export default connect(null,{ savePost,updatePost })(PostForm);