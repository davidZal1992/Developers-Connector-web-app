import axios from 'axios';
import {setAlert, removeAlert} from '../actions/alert';

import {
    GET_POSTS,
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
       const res = await axios.post('http://localhost:5000/api/posts',post,config)

       dispatch({
        type: CREATE_POST,
        payload:res.data
        });

        dispatch( 
            setAlert('Post succesfully create','success')
        )

    }
    catch(err){
        console.log(err.response)
        dispatch({
            type: POST_ERROR,
            payload: {msg : err.response.statusText, status:err.response.status}
        });
    }   

}


//Create post
export const getPosts = () => async dispatch => {
    try{
       const res = await axios.get('http://localhost:5000/api/posts')
       dispatch({
           type: GET_POSTS,
           payload: res.data
       }
        
       )
    }
    catch(err){
        console.log(err.response)
        dispatch({
            type: POST_ERROR,
            payload: {msg : err.response.statusText, status:err.response.status}
        });
    }   

}


//Add like
export const addLike = (postId) => async dispatch => {
    try{
       const res = await axios.put(`http://localhost:5000/api/posts/like/${postId}`)
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
       const res = await axios.put(`http://localhost:5000/api/posts/unlike/${postId}`)
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

       const res = await axios.delete(`http://localhost:5000/api/posts/${postId}`)
       dispatch({
           type: DELETE_POST,
           payload: {postId,likes:res.data}
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

