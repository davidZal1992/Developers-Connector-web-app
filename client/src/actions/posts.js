import api from '../utils/api';
import {setAlert, removeAlert} from '../actions/alert';

import {
    GET_POSTS,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT,
    CREATE_POST,
    DELETE_POST,
    UPDATE_LIKES,
    POST_ERROR
} from './types';


//Create post
export const createPost = (post) => async dispatch => {
    try{
        dispatch( 
            removeAlert()
        ) 
       const config ={
           headers:{
               'Content-Type': 'application/json'
           }
       }
       const res = await api.post('/posts',post,config)

       dispatch({
        type: CREATE_POST,
        payload:res.data
        });

        dispatch( 
            setAlert('Post succesfully create','success')
        )

    }
    catch(err){
        dispatch({
            type: POST_ERROR,
            payload: {msg : err.response.statusText, status:err.response.status}
        });
    }   

}


//Create post
export const getPosts = () => async dispatch => {
    try{
       const res = await api.get('/posts')
       dispatch({
           type: GET_POSTS,
           payload: res.data
       }
       )
    }
    catch(err){
        dispatch({
            type: POST_ERROR,
            payload: {msg : err.response.statusText, status:err.response.status}
        });
    }   

}


//Add like
export const addLike = (postId) => async dispatch => {
    try{
       const res = await api.put(`/posts/like/${postId}`)
       dispatch({
           type: UPDATE_LIKES,
           payload: {postId,likes:res.data}
       }
        
       )
    }
    catch(err){
        dispatch({
            type: POST_ERROR,
            payload: {msg : err.response.statusText, status:err.response.status}
        });
    }   
}

//Remove like
export const removeLike = (postId) => async dispatch => {
    try{
       const res = await api.put(`/posts/unlike/${postId}`)
       dispatch({
           type: UPDATE_LIKES,
           payload: {postId,likes:res.data}
       }
        
       )
    }
    catch(err){
        dispatch({
            type: POST_ERROR,
            payload: {msg : err.response.statusText, status:err.response.status}
        });
    }   
}

//Delete post
export const deletePost = (postId) => async dispatch => {
    try{
        dispatch( 
            removeAlert()
        ) 

        await api.delete(`/posts/${postId}`)
       dispatch({
           type: DELETE_POST,
           payload: postId
       }
       )
       dispatch(setAlert("Post deleted",'success'))
       dispatch((getPosts()))
    }
    catch(err){
        dispatch({
            type: POST_ERROR,
            payload: {msg : err.response.statusText, status:err.response.status}
        });
    }   
}


//Get post
export const getPost = (postId) => async dispatch => {
    try{
        dispatch( 
            removeAlert()
        ) 

       const res = await api.get(`/posts/${postId}`)
       dispatch({
           type: GET_POST,
           payload: res.data
       }
       )
    }
    catch(err){
        dispatch({
            type: POST_ERROR,
            payload: {msg : err.response.statusText, status:err.response.status}
        });
    }   
}

//Add comment
export const addComment = (postId,text) => async dispatch => {
    try{
        dispatch( 
            removeAlert()
        ) 
        const config ={
            headers:{
                'Content-Type': 'application/json'
            }
        }    
       const res = await api.post(`/posts/comment/${postId}`,text,config)
       dispatch({
           type: ADD_COMMENT,
           payload: res.data
       }
       )
       dispatch(setAlert("Comment added",'success'))
    }
    catch(err){
        dispatch({
            type: POST_ERROR,
            payload: {msg : err.response.statusText, status:err.response.status}
        });
    }   
}


//Delete comment
export const removeComment = (postId,commentId) => async dispatch => {
    try{
        dispatch( 
            removeAlert()
        )
       const res = await api.delete(`/posts/comment/${postId}/${commentId}`)
       dispatch({
           type: REMOVE_COMMENT,
           payload: res.data
       }
       )
       dispatch(setAlert("Comment removed",'success'))
    }
    catch(err){
        dispatch({
            type: POST_ERROR,
            payload: {msg : err.response.statusText, status:err.response.status}
        });
    }   
}
