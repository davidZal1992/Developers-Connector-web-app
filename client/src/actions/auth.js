import axios from 'axios';
import {setAlert,removeAlert} from '../actions/alert';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    CLEAR_PROFILE,
    LOGOUT
} from './types';
import setAuthToken from '../utils/setAuthToken'

//Load User
export const loadUser = () => async dispatch => {
    const token = localStorage.getItem('token')
    if(token)
        setAuthToken(token)
    try{
       const res = await axios.get('http://localhost:5000/api/auth')
       dispatch({
           type: USER_LOADED,
           payload: res.data
       })
    }
    catch(err){
        console.log(err.response)
        dispatch({
            type: AUTH_ERROR,
        });
    }   

}


//Register User
export const register = ( {name,email,password}) => async dispatch => {
    
    try{
        const res = await axios.post('http://localhost:5000/api/users',{name: name, email:email, password:password});
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
        dispatch((errors[0].msg,'danger'))
        }

        dispatch({
            type: REGISTER_FAIL,
        });
    }
    
}

//Login-in User
export const login = ( {email,password}) => async dispatch => {
    
    try{
        const res = await axios.post('http://localhost:5000/api/auth',{email:email, password:password});
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


//Logout User
export const logout = ( {email,password}) => async dispatch => {
    dispatch({type: CLEAR_PROFILE})
    dispatch({type: LOGOUT})

    
}