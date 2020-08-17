import {v4 as uuidv4} from 'uuid';
import {SET_ALERT, REMOVE_ALERT} from './types';

export const setAlert = (msg,alertType) => dispatch => {
    const id = uuidv4(); 
    dispatch({
        type:SET_ALERT,
        payload: {msg, alertType , id}
    });

    setInterval(() => {
    const id = uuidv4(); 
    dispatch({
    type:REMOVE_ALERT,
    payload: {msg, alertType , id}
    });
    },10000)
};

export const removeAlert = (msg,alertType) => dispatch => {
    const id = uuidv4(); 
    dispatch({
        type:REMOVE_ALERT,
        payload: {msg, alertType , id}
    });
};