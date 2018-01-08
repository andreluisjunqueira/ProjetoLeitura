import { 
    GET_POSTS, 
    VOTE_POST, 
    SAVE_POST, 
    DELETE_POST, 
    UPDATE_POST, 
    GET_POSTS_BY_CATEGORY, 
} from './types';

export const getAllPosts = ()=>{
    return {
        type : GET_POSTS
    }
}

export const getByCategory = (category)=>{
    return{
        type : GET_POSTS_BY_CATEGORY,
        category
    }
}

export const savePost = (post, callback)=>{
    return {
        type : SAVE_POST,
        post,
        callback
    }
}

export const updatePost = (post, callback)=>{
    return{
        type : UPDATE_POST,
        post,
        callback
    }
}


export const deletePost = (id, callback)=>{
    return {
        type : DELETE_POST,
        id,
        callback
    }
}

export const votePost = (option, callback)=>{
    return{
        type : VOTE_POST,
        payload : { 
            option, 
            callback 
        } 
    }
}