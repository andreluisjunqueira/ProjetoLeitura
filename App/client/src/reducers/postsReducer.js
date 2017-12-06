
import { POSTS, VOTE_SUCCESS, GET_POSTS_BY_CATEGORY_SUCCESS, GET_POSTS_BY_ID  } from '../actions/types';

const INITIAL_STATE = {
    posts:{},
    postsCategory : {},
    post : {},
}
export const posts = (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case GET_POSTS_BY_ID :
            return{
                ...state,
                ['post'] : action.post
            }
        case GET_POSTS_BY_CATEGORY_SUCCESS :
            return{
                ...state,
                ['postsCategory'] : action.posts
            }
        case POSTS:
            return{
                ...state,
                ['posts'] : action.posts
            }
        case VOTE_SUCCESS :
            return{
                ...state,
                ['posts'] : {
                    ...state['posts'],
                    [action.post.id] : action.post
                }

            }
        default :
            return state;
    }
}


