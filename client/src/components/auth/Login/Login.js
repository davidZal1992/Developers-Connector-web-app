import React,{Fragment , useState} from 'react'
import {Link, Redirect} from 'react-router-dom';

import { connect } from 'react-redux';
import Alert from '../../Alert/Alert';

import SocialLogin from '../SocialLogin/SocialLogin'

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

    //If Authenticated redirect to dashboard page
    if(isAuthenticated){
    return  <Redirect to="/dashboard"/>
    }
    
    return <Fragment>
        <section className="container">
            <div className="left-box">
                <Alert/>    
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i className="fas fa-user"></i> Sign into your account</p>
                <form action="dashboard.html" onSubmit={submitDetails}>
                    <input type="email" placeholder="Email" name='email'value={email}  onChange={handleChange} required />
                    <input type="password" placeholder="Password" name='password' value={password} onChange={handleChange} minLength="6" />
                    <input type="submit" value="Login" className="btn btn-primary" />
                </form>
                <p className="my-1">Dont have an account? <Link to="/register">Sign up</Link></p>
            </div>
            <div className="or">OR</div>
            <div className="right-box">
                <SocialLogin/>
            </div>
        </section>
        </Fragment>
}

const mapStateToProps = state =>({
    isAuthenticated : state.auth.isAuthenticated
})
export default connect(mapStateToProps,{login})(Login);

