import {setAlert,removeAlert} from '../actions/alert';
import api from '../utils/api';

import {
    REGISTER_SUCCESS,
    OAUTH_SUCCESS,
    OAUTH_FAIL,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    CLEAR_PROFILE,
    LOGOUT
} from './types';


//Load User
export const loadUser = () => async dispatch => {
    try{
       const res = await api.get('/auth')
       dispatch({
           type: USER_LOADED,
           payload: res.data
       })
    }
    catch(err){
        dispatch({
            type: AUTH_ERROR,
        });
    }   

}


//Register User
export const register = ( {name,email,password}) => async dispatch => {
    
    try{
        const res = await api.post('/users',{name: name, email:email, password:password});

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });


        dispatch(loadUser())
        dispatch(removeAlert())
    }
    catch(err){
        const errors = err.response.data.errors;
        if(errors){
            dispatch(setAlert(errors[0].msg,'danger'))
        }

        dispatch({
            type: REGISTER_FAIL,
        });
    }
    
}

//Login-in User
export const login = ( {email,password}) => async dispatch => {
    
    try{
        const res = await api.post('/auth',{email:email, password:password});
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser())
        dispatch(removeAlert())
    }
    catch(err){
        const errors = err.response.data.errors;
        if(errors){
        dispatch(setAlert(errors[0].msg,'danger'))
        }

        dispatch({
            type: LOGIN_FAIL,
        });
    }
    
}


//Login with Facebooj
export const googleAuth = ( tokenId) => async dispatch => {
    
    try{
        const res = await api.post('/oauth/google-auth',{tokenId: tokenId});
        dispatch({
            type: OAUTH_SUCCESS,
            payload: res.data
        });
        
        dispatch(loadUser())
        dispatch(removeAlert())

    }
    catch(err){
        const errors = err.response.data.errors;
        if(errors){
        dispatch(setAlert(errors[0].msg,'danger'))
        }

        dispatch({
            type: OAUTH_FAIL
        });
    }
    
}


//Login with Google
export const facebookAuth = (accessToken,userId) => async dispatch => {
    
    try{
        const res = await api.post('/oauth/facebook-auth',{accessToken: accessToken ,userId: userId});
        dispatch({
            type: OAUTH_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser())
        dispatch(removeAlert())

    }
    catch(err){
        const errors = err.response.data.errors;
        if(errors){
        dispatch(setAlert(errors[0].msg,'danger'))
        }

        dispatch({
            type: OAUTH_FAIL
        });
    }
    
}



//Logout User
export const logout = ( {email,password}) => async dispatch => {
    dispatch({type: CLEAR_PROFILE})
    dispatch({type: LOGOUT})

}