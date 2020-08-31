import React,{Fragment,useEffect} from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import '../src/App.css'

import Navbar from './components/navbar/Navbar'
import Landing from './components/landing/landing'
import Login from './components/auth/login/Login'
import Register from './components/auth/register/Register'
import {loadUser} from './actions/auth'
import setAuthToken from './utils/setAuthToken'
import Dashboard from './components/dashboard/dashboard/Dashboard'
import CreateProfile from './components/profile-forms/create-profile/CreateProfile'
import PrivateRoute from './components/private-routes/PrivateRoute'
import EditProfile from './components/profile-forms/edit-profile/EditProfile'
import AddEducation from './components/profile-forms/add-education/AddEducation'
import AddExperince from './components/profile-forms/add-experience/AddExperience'
import Profiles from './components/profiles/profiles/Profiles'
import Profile from './components/profile/profile/Profile'
import Posts from './components/posts/posts/Posts'
import Post from './components/posts/post/Post'
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
    <div className="main-container">
        <Navbar/>
        <Route exact path="/" component={Landing}/>
        <Switch>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/profiles" component={Profiles}/>
          <Route exact path="/profile/:id" component={Profile}/>
          <PrivateRoute exact path="/dashboard" component={Dashboard}/>
          <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
          <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
          <PrivateRoute exact path="/add-education" component={AddEducation}/>
          <PrivateRoute exact path="/add-experience" component={AddExperince}/>
          <PrivateRoute exact path="/posts" component={Posts}/>
          <PrivateRoute exact path="/posts/post/:id" component={Post}/>
        </Switch>
      </div>
      </Fragment>
    </Router>
  </Provider>
)}

export default App;
