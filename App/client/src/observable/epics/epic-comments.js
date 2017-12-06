
import { combineEpics } from 'redux-observable';
import requestApi from '../../utils/requestApi';
import uuidv1 from 'uuid/v1';
import { GET_COMMENTS_BY_POST, COMMENTS, VOTE_COMMENT, NEW_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from '../../actions/types';

const getComments = (action$)=>{
    return action$.ofType(GET_COMMENTS_BY_POST)
                    .map(action=>action.postId)
                    .mergeMap(requestApi.comments.getByPost)
                    .map(comments=>({type : COMMENTS, comments}));
}

const newComment = (action$)=>{
    return action$.ofType(NEW_COMMENT)
                .do(({payload})=>{
                    let { comment, callback } = payload;
                    comment.timestamp = new Date().getTime();
                    comment.id = uuidv1();
        
                    requestApi.comments.createComment(comment).then(callback)
                })
                .takeLast()
}

const voteComment = (action$)=>{
    return action$.ofType(VOTE_COMMENT)
            .do(({payload})=>{
                const { option, callback } = payload;
                requestApi.comments.voteComment(option).then(callback)
            })
            .takeLast();
}

const editComment = (action$)=>{
    return action$.ofType(EDIT_COMMENT)
            .do(({payload})=>{
                const { comment, callback } = payload;
                requestApi.comments.editComment(comment).then(callback);
            })
            .takeLast();
}

const deleteComment = (action$)=>{
    return action$.ofType(DELETE_COMMENT)
        .do(({payload})=>{
            const { id, callback } = payload;
            requestApi.comments.deleteComment(id).then(callback)
        })
        .takeLast()
}
                                                

export default combineEpics(
    getComments,
    newComment,
    voteComment,
    editComment,
    deleteComment
)