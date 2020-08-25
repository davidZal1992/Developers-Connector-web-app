import {GET_POSTS,GET_POST, POST_ERROR,CREATE_POST,DELETE_POST,UPDATE_LIKES,ADD_COMMENT, REMOVE_COMMENT} from '../actions/types'

const initialState = {
   posts:[],
   post:null,
   loading: true,
   error: {}
}


export default function(state = initialState ,action){
    const {type,payload} = action;
    switch(type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case GET_POST:
            return {
                ...state,
                post:payload,
                loading: false
            }
        case CREATE_POST:
            return {
                ...state,
                posts: [...state.posts,payload],
                loading: false
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                loading: false
            }
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map((post) => post._id === payload.postId ? {...post, likes:payload.likes} : post),
            }
        case REMOVE_COMMENT:
        case ADD_COMMENT:
            return {
                ...state,
                post: {...state.post, comments:payload} ,
                loading : false
            }
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            }
        default:
            return state;
    }
}