import React from 'react'
import {Route,Switch} from 'react-router-dom'
import Login from '../../auth/login/Login'
import Register from '../../auth/register/Register'
import Dashboard from '../../dashboard/dashboard/Dashboard'
import CreateProfile from '../../profile-forms/create-profile/CreateProfile'
import PrivateRoute from '../private-routes/PrivateRoute'
import EditProfile from '../../profile-forms/edit-profile/EditProfile'
import AddEducation from '../../profile-forms/add-education/AddEducation'
import AddExperince from '../../profile-forms/add-experience/AddExperience'
import Profiles from '../../profiles/profiles/Profiles'
import Profile from '../../profile/profile/Profile'
import Posts from '../../posts/posts/Posts'
import Post from '../../posts/post/Post'
import NoFound from '../../no-found/NoFound'

const Routes = () => {
    return(
        <section className="container">
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
            <Route component={NoFound}/>
            </Switch>
        </section>
    )
}


export default Routes
