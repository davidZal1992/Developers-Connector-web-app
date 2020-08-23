import axios from 'axios';
import {setAlert} from '../actions/alert'
import {
   GET_PROFILE,
   CREATE_PROFILE,
   GET_REPOS,
   UPDATE_PROFILE,
   GET_PROFILES,
   CLEAR_PROFILE,
   ACCOUNT_DELETED,
   PROFILE_ERROR
} from './types';

// Get current users profile
export const loadProfile = () => async dispatch => {
    try{
       const res = await axios.get('http://localhost:5000/api/profile/me')
       dispatch({
           type: GET_PROFILE,
           payload: res.data
       })
    }
    catch(err){
        console.log(err.response)
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg : err.response.statusText, status:err.response.status}
        });
    }   

}

// Create and Update profile

export const createProfile = (formData, history , imageProfile,edit = false) => async dispatch => {
    try{
       const res = await axios.post('http://localhost:5000/api/profile',formData)
       dispatch({
           type: CREATE_PROFILE,
           payload: res.data
       })
       console.log()
       if(imageProfile.has('imageProfile')){
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
         await axios.post("http://localhost:5000/api/profile/upload",imageProfile,config)
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
            console.log(errors.errors)
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
       const res = await axios.put('http://localhost:5000/api/profile/experience',formData)
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
       const res = await axios.put('http://localhost:5000/api/profile/education',formData)
       dispatch({
           type:UPDATE_PROFILE,
           payload: res.data
       })

       dispatch(setAlert("Education added",'success'))
        history.push('/dashboard')
    
    }
    catch(err){
        const errors = err.response.data.errors;
        console.log(err.response)
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
       const res = await axios.delete('http://localhost:5000/api/profile/experience/'+expId)
       dispatch({
           type:UPDATE_PROFILE,
           payload: res.data
       })

       dispatch(setAlert("Experience deleted",'success'))
    
    }
    catch(err){
        console.log(err.response)
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg : err.response.statusText, status:err.response.status}
        });
    }   
}

// Delete Education
export const deleteEducation = (eduId) => async dispatch => {
    try{
       const res = await axios.delete('http://localhost:5000/api/profile/education/'+eduId)
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
                await axios.delete('http://localhost:5000/api/profile')
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
        const res = await axios.get('http://localhost:5000/api/profile')
        console.log(res)
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })
        }
        catch(err){
            console.log(err)
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg : err.response.statusText, status:err.response.status}
            });
        }  
}

// Get profile by id
export const getProfileById = (profileId) => async dispatch => {
    dispatch({type: CLEAR_PROFILE})
    try{
    const res = await axios.get('http://localhost:5000/api/profile/user/'+profileId)

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

// Get repos of user
export const getGithubRepos = (profileId) => async dispatch => {
    try{
    const res = await axios.get('http://localhost:5000/api/profile/github/'+profileId)
        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    }
    catch(err){
        console.log(err.response)
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg : err.response.statusText, status:err.response.status}
        });
    }  
}
