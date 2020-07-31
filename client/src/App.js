import React,{Fragment,useEffect} from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import '../src/App.css'

import {Navbar} from './components/Layout/NavBar/Navbar'
import {Landing} from '../src/pages/landing/landing'
import Login from './components/auth/Login/Login'
import Register from './components/auth/Register/Register'
import {loadUser} from './actions/auth'
import setAuthToken from './utils/setAuthToken'

import store from './store'

const App = () => { 
  const token = localStorage.getItem('token')
  if(token){
    setAuthToken(token)
  }

  useEffect(() =>{
  store.dispatch(loadUser())},[])
  
  return(
  <Provider store={store}>
    <Router>
    <Fragment>
        <Navbar/>
        <Route exact path="/" component={Landing}/>
        <Switch>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
      </Switch>
      </Fragment>
    </Router>
  </Provider>
)}

export default App;
