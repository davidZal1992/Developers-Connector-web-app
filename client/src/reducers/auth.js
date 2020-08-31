import {
    REGISTER_SUCCESS,
    OAUTH_SUCCESS,
    OAUTH_FAIL,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTH_ERROR,
    USER_LOADED,
    ACCOUNT_DELETED,
    LOGOUT
} from '../actions/types';

const initialState={
    token: localStorage.getItem('token'),
    isAuthenticated:null,
    loading:true,
    user: null
}

export default function(state = initialState, action){
    const {type,payload} = action;
    switch(type)
    {
        case REGISTER_SUCCESS:
            localStorage.setItem('token',payload.token);
            return{
                ...state,
                ...payload,
                isAuthenticated: true,
                loading:false
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token);
            return{
                ...state,
                ...payload,
                isAuthenticated: true,
                loading:false
            }
        case OAUTH_SUCCESS:
            localStorage.setItem('token',payload.token);
            return{
                ...state,
                ...payload,
                isAuthenticated: true,
                loading:false
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated:true,
                loading: false,
                user: payload
            }  
        case REGISTER_FAIL:
        case ACCOUNT_DELETED:
        case OAUTH_FAIL:
        case LOGIN_FAIL:  
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token:null,
                isAuthenticated:false,
                loading: false,
                user:null
            }
        default:
            return state;
    }
}