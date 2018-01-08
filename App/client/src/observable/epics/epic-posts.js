import { combineEpics } from 'redux-observable';
import uuidv1 from 'uuid/v1';
import requestApi from '../../utils/requestApi';
import { GET_POSTS, POSTS, VOTE_POST, SAVE_POST, VOTE_SUCCESS, DELETE_POST, UPDATE_POST, GET_POSTS_BY_CATEGORY, GET_POSTS_BY_CATEGORY_SUCCESS } from '../../actions/types';
import { Observable } from 'rxjs/Observable';

const getPosts = (action$)=>{
    return action$.ofType(GET_POSTS)
        .mergeMap(requestApi.posts.getAllPosts)
        .mergeMap(data=>{
            const _data = data.sort((a, b)=>b.voteScore - a.voteScore)
                .reduce((prev, next)=>({...prev, [next.id] : next}),{})
            return Observable.of(_data)
        })
        .map((posts)=>({
            type : POSTS,
            posts
        }))
}

const getByCategory = (action$)=>{
    return action$.ofType(GET_POSTS_BY_CATEGORY)
        .map(action=>action.category)
        .mergeMap(requestApi.posts.getByCategory)
        .mergeMap(data=>{
            const _data = data.sort((a, b)=>b.voteScore - a.voteScore)
                .reduce((prev, next)=>({...prev, [next.id] : next}),{})
            return Observable.of(_data)
        })
        .map((posts)=>({
            type : GET_POSTS_BY_CATEGORY_SUCCESS,
            posts
        }))
}

const votePost = (action$)=>{
    return action$.ofType(VOTE_POST)
            .map(({payload})=>payload.option)
            .mergeMap(requestApi.posts.votePost)
            .map((res)=>{
                return{
                    type : VOTE_SUCCESS,
                    post : res
                }
            })
}

const deletePost = (action$)=>{
    return action$.ofType(DELETE_POST)
        .map(({callback,id})=>({callback,id}))
        .mergeMap(({ callback, id })=>{
            return requestApi.posts.deletePost(id).then(()=>{
                return callback();
            })
        })
        .mapTo({
            type : GET_POSTS
        });

}

const createPost = (action$, store)=>{
    return action$.ofType(SAVE_POST)
           .map(({post, callback})=>{
                post.timestamp = new Date().getTime();
                post.id = uuidv1();                
                return {post, callback};
            })
           .mergeMap(({post, callback})=>{
                return Observable.create(observer=>{
                    requestApi.posts.createPost(post).then((resp)=>{
                        observer.next(resp);
                        callback();
                        observer.complete();
                    })
                })
            })
           .map(post=>{
               const { posts } = store.getState();
               return {  
                   type : POSTS,
                   posts : {...posts.posts, ...{[post.id] : post} }
               }
           })
}

const updatePost = (action$, store)=>{
    return action$.ofType(UPDATE_POST)
            .mergeMap(({post, callback})=>{
                return Observable.create(observer=>{
                    requestApi.posts.editPost(post).then(resp=>{
                        observer.next(resp);
                        callback();
                        observer.complete();
                    })
                })
            })
            .map((post)=>{
                const { posts } = store.getState();
                return {  
                    type : POSTS,
                    posts : {...posts.posts, ...{[post.id] : post} }
                }
            })
        
}

export default combineEpics(
    getPosts,
    votePost,
    createPost,
    deletePost,
    updatePost,
    getByCategory
)