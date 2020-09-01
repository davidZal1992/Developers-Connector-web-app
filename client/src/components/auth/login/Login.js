import React,{Fragment , useState} from 'react'
import {Link, Redirect} from 'react-router-dom';
import SocialLogin from '../social-login/SocialLogin'
import { connect } from 'react-redux';
import Alert from '../../alert/Alert'

import {login} from '../../../actions/auth'

    const Login = ({login,isAuthenticated}) => {
    const [formDate,setFormData] = useState({
        email:'',
        password:'',
    });

    const {email,password} = formDate;
    const handleChange = e => setFormData({...formDate,[e.target.name]:e.target.value})  //Save the values of inputs

    const submitDetails = async e => {
        e.preventDefault();
        login({email,password})
    }

    //If Authenticated redirect to posts page
    if(isAuthenticated){
    return  <Redirect to="/dashboard"/>
    }
    return(
    <Fragment>
        <div className="container-auth text-center">
                <h1 className="large text-primary">Sign In</h1>
                <p className="lead">
                    <i className="fas fa-user"></i>{' '}Sign In Into Your Account
                </p>
                <div className="show-alert">
                <Alert/>
                </div>
                <form className="form" action="dashboard.html" onSubmit={submitDetails}>
                        <div className="form-group">
                            <input type="email" placeholder="Email" name='email' value={email}  onChange={handleChange}  />
                        </div>
                        <div className="form-group">
                            <input type="password" placeholder="Password" name='password' value={password} onChange={handleChange} minLength="6" />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Login" className="btn btn-primary" />
                        </div>
                        <p className="my-1">
                            Dont have an account? <Link to="/register">Sign Up</Link>
                        </p>
                </form>
                <div className="seperator-or-line  m-1"><span>OR</span></div>
                <div className="social">
                    <SocialLogin/>
                </div>
        </div>
        </Fragment>
        )
}

const mapStateToProps = state =>({
    isAuthenticated : state.auth.isAuthenticated
})
export default connect(mapStateToProps,{login})(Login);

