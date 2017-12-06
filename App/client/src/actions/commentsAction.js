import { GET_COMMENTS_BY_POST, VOTE_COMMENT, NEW_COMMENT, DELETE_COMMENT, EDIT_COMMENT }from './types';

export const newComment = (comment, callback)=>{
    return {
        type : NEW_COMMENT,
        payload : {
            comment,
            callback
        }
    }
}

export const getByPost = ( postId )=>{
    return{
        type : GET_COMMENTS_BY_POST,
        postId
    }
}

export const deleteComment = (commentId, callback)=>{
    return {
        type : DELETE_COMMENT,
        payload : {
            id : commentId,
            callback
        }
    }
}

export const editComment = (comment, callback)=>{
    comment.timestamp = new Date().getTime();
    return{
        type : EDIT_COMMENT,
        payload : {
            comment,
            callback
        }
    }
}

export const voteComment = (option, callback)=>{
    return{
        type : VOTE_COMMENT,
        payload : { 
            option, 
            callback 
        } 
    }
}