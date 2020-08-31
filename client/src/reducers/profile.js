import {GET_PROFILE, PROFILE_ERROR,CLEAR_PROFILE, UPDATE_PROFILE,GET_PROFILES,GET_REPOS,GET_TOP} from '../actions/types'

const initialState = {
   profile: null,
   profiles:[],
   toprates:[],
   repos:[],
   loading: true,
   error: {}
}


export default function(state = initialState ,action){
    const {type,payload} = action;
    switch(type) {
        case UPDATE_PROFILE:
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                profile:null
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos:[],
                error:null,
                loading: false
            }
        case GET_PROFILES:
            return{
                ...state,
                profiles:payload,
                loading:false
            }
        case GET_REPOS:
            return{
                ...state,
                repos:payload,
                loading:false
            }
        case GET_TOP:
            return{
                ...state,
                toprates:payload,
                loading:false
            }
        default:
            return state;
    }
}