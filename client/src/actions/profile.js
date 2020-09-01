import axios from 'axios';
import {setAlert,removeAlert} from '../actions/alert'
import {
   GET_PROFILE,
   CREATE_PROFILE,
   GET_REPOS,
   UPDATE_PROFILE,
   GET_PROFILES,
   CLEAR_PROFILE,
   GET_TOP,
   ACCOUNT_DELETED,
   PROFILE_ERROR
} from './types';

// Get current users profile
export const loadProfile = () => async dispatch => {
    try{
        dispatch( 
            removeAlert()
        ) 
       const res = await axios.get('/api/profile/me')
       dispatch({
           type: GET_PROFILE,
           payload: res.data
       })
    }
    catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg : err.response.statusText, status:err.response.status}
        });
    }   

}

// Create and Update profile

export const createProfile = (formData, history , imageProfile,edit = false) => async dispatch => {
    try{
       dispatch( 
        removeAlert()
        ) 
       const res = await axios.post('/api/profile',formData)
       dispatch({
           type: CREATE_PROFILE,
           payload: res.data
       })
       if(imageProfile.has('imageProfile')){
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
         await axios.post("/api/profile/upload",imageProfile,config)
       }

       if(!edit){
        dispatch(setAlert("Profile created",'success'))
        history.push('/dashboard')
        }
        else{
        dispatch(setAlert("Profile edited",'success'))
        }
    }
    catch(err){
        if(err.response.data.errors){
            const errors=err.response.data
            dispatch(setAlert(errors.errors[0].msg,'danger'))
        }
        else{
            const str = err.response.data
            let newErr=str.substring(str.lastIndexOf("Error:")+7,str.indexOf("<br>"))
            dispatch(setAlert(newErr,'danger'))
        }
    }   

}

// Add Experince
export const addExperience = (formData,history) => async dispatch => {
    try{

       dispatch( 
            removeAlert()
        ) 
       const res = await axios.put('/api/profile/experience',formData)
       dispatch({
           type:UPDATE_PROFILE,
           payload: res.data
       })

       dispatch(setAlert("Experience added",'success'))
        history.push('/dashboard')
    
    }
    catch(err){
        const errors = err.response.data.errors;
        
        if(errors){
        dispatch(setAlert(errors[0].msg,'danger'))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg : err.response.statusText, status:err.response.status}
        });
    }   
}

// Add Education
export const addEducation = (formData,history) => async dispatch => {
    try{
       dispatch( 
            removeAlert()
        ) 
       const res = await axios.put('/api/profile/education',formData)
       dispatch({
           type:UPDATE_PROFILE,
           payload: res.data
       })

       dispatch(setAlert("Education added",'success'))
        history.push('/dashboard')
    
    }
    catch(err){
        const errors = err.response.data.errors;
        if(errors){
        dispatch(setAlert(errors[0].msg,'danger'))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg : err.response.statusText, status:err.response.status}
        });
    }   
}

// Delete Experince
export const deleteExperience = (expId) => async dispatch => {
    try{
        dispatch( 
            removeAlert()
        ) 
       const res = await axios.delete('/api/profile/experience/'+expId)
       dispatch({
           type:UPDATE_PROFILE,
           payload: res.data
       })

       dispatch(setAlert(" Experience deleted",'success'))
    
    }
    catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg : err.response.statusText, status:err.response.status}
        });
    }   
}

// Delete Education
export const deleteEducation = (eduId) => async dispatch => {
    try{
       dispatch( 
            removeAlert()
        ) 
       const res = await axios.delete('/api/profile/education/'+eduId)
       dispatch({
           type:UPDATE_PROFILE,
           payload: res.data
       })

       dispatch(setAlert("Education deleted",'success'))
    
    }
    catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg : err.response.statusText, status:err.response.status}
        });
    }   
}

export const deleteAccount = () => async dispatch => {
        if(window.confirm(`Are you sure you want to delete your account? After that you can't UNDO operation`)){
            try{
                await axios.delete('/api/profile')
                dispatch({type: CLEAR_PROFILE})
                dispatch({type: ACCOUNT_DELETED})
            }
            catch(err){
                dispatch({
                    type: PROFILE_ERROR,
                    payload: {msg : err.response.statusText, status:err.response.status}
                });
            }  
        } 
}
// Get all profiles
export const getProfiles = () => async dispatch => {
        dispatch({type: CLEAR_PROFILE})
        try{
        const res = await axios.get('/api/profile')
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })
        }
        catch(err){
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg : err.response.statusText, status:err.response.status}
            });
        }  
}

// Get profile by id
export const getProfileById = (profileId,history) => async dispatch => {
    dispatch({type: CLEAR_PROFILE})
    try{
    const res = await axios.get('/api/profile/user/'+profileId)

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    }
    catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg : err.response.statusText, status:err.response.status}
        });
        history.push('/profiles')
    }  
}

// Get repos of user
export const getGithubRepos = (profileId) => async dispatch => {
    try{
    const res = await axios.get('/api/profile/github/'+profileId)
        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    }
    catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg : err.response.statusText, status:err.response.status}
        });
    }  
}


// Rate user
export const rateUser = (ratingValue,userId) => async dispatch => {
    try{
    const rating={ratingValue:ratingValue}
    const res = await axios.put('/api/profile/rating/'+userId, rating)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert("Thanks For Rating!",'success'))
    }
    catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg : err.response.statusText, status:err.response.status}
        });
    }  
}

// Get top rates profile
export const getTop = () => async dispatch => {
    try{
    const res = await axios.get('/api/profile/rating/top')
        dispatch({
            type: GET_TOP,
            payload: res.data
        })
    }
    catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg : err.response.statusText, status:err.response.status}
        });
    }  
}
