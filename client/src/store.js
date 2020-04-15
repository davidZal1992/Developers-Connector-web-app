import {createStore, appyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState={}

const middleware =[thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(appyMiddleware(...middleware))
);

export default store;