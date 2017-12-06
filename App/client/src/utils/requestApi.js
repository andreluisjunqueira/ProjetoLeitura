const baseURL = 'http://localhost:3001/';
const authorization = 'projetoleituraudacity';

function requestApi(){

    const _categories={
        getAll(){
            return fetch(`${baseURL}categories`,{
                headers : { Authorization : authorization }
            }).then(resp=>resp.json())
        }
    }

    const _posts={
        getAllPosts(sort){
            return fetch(`${baseURL}posts`,{
                headers : { Authorization : authorization }
            }).then(resp=>resp.json())
        },
        getById(id){
            return fetch(`${baseURL}posts/${id}`,{
                headers : { Authorization : authorization }
            }).then(resp=>resp.json())
        },
        getByCategory(category){
            return fetch(`${baseURL+category}/posts`,{
                headers : { Authorization : authorization }
            }).then(resp=>resp.json())
        },
        createPost(post){
            return fetch(`${baseURL}posts`,{
                method : 'POST',
                headers : { 
                    "Authorization" : authorization,
                    "Content-Type": "application/json",
                },
                body : JSON.stringify(post)
            }).then(resp=>resp.json())
        },
        editPost(post){
            return fetch(`${baseURL}posts/${post.id}`,{
                method : 'PUT',
                headers : { 
                    'Authorization' : authorization, 
                    "Content-Type": "application/json",
                },
                body : JSON.stringify(post)
            }).then(resp=>resp.json())
        },
        votePost({id, option}){
            return fetch(`${baseURL}posts/${id}`,{
                method : 'POST',
                headers : { 
                    "Authorization" : authorization,
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({option})
            }).then(resp=>resp.json())
        },

        deletePost(postId){
            return fetch(`${baseURL}posts/${postId}`,{
                method : 'DELETE',
                headers : { 
                    "Authorization" : authorization
                }
            })
        }
    }

    const _comments={
        getByPost(postId){
            return fetch(`${baseURL}posts/${postId}/comments`,{
                headers : { Authorization : authorization }
            }).then(resp=>resp.json())

        },

        getById(commentId){

        },

        createComment(comment){
            return fetch(`${baseURL}comments`,{
                method : 'POST',
                headers : { 
                    "Authorization" : authorization,
                    "Content-Type": "application/json",
                },
                body : JSON.stringify(comment)
            }).then(resp=>resp.json())
        },

        editComment(comment){
            delete comment.author;
            return fetch(`${baseURL}comments/${comment.commentId}`,{
                method : 'PUT',
                headers : { 
                    "Authorization" : authorization,
                    "Content-Type": "application/json",
                },
                body : JSON.stringify(comment)
            }).then(resp=>resp.json())
        },

        deleteComment(commentId){
            return fetch(`${baseURL}comments/${commentId}`,{
                method : 'DELETE',
                headers : { 
                    "Authorization" : authorization
                }
            })
        },
        voteComment({id, option}){
            return fetch(`${baseURL}comments/${id}`,{
                method : 'POST',
                headers : { 
                    "Authorization" : authorization,
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({option})
            }).then(resp=>resp.json())
        }
    }

    return{
        categories : _categories,
        posts : _posts,
        comments : _comments,
    }
}
export default requestApi();