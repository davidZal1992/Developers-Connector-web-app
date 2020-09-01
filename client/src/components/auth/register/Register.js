import React,{Fragment , useState} from 'react'
import {Link,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import SocialLogin from '../social-login/SocialLogin'
import './Register.css'

import {register} from '../../../actions/auth';

import Alert from '../../alert/Alert';


 const Register = ({setAlert , register, isAuthenticated}) => {
    const [formDate,setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    });
    const {name,email,password,password2} = formDate;
    const handleChange = e => setFormData({...formDate,[e.target.name]:e.target.value})  //Save the values of inputs and change immutable state

    const submitDetails = async e => {
        e.preventDefault();
        if(password !==password2){
        setAlert('Password do not match','danger');
        }
        else{
        register({name,email,password})
        }
    }

    //If Authenticated redirect to posts page
    if(isAuthenticated){
        return <Redirect to="/dashboard"/>
     }

    return (
    <Fragment>
        <div className="container-auth text-center">
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead">
                    <i className="fas fa-user"></i>{' '}Create Your Account
                </p>
                <div className="show-alert">
                <Alert/>
                </div>
                <form className="form" action="dashboard.html" onSubmit={submitDetails}>
                        <div className="form-group">
                            <input type="text" placeholder="Name" name='name' value={name} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <input type="email" placeholder="Email" name='email' value={email}  onChange={handleChange}  />
                        </div>
                        <div className="form-group">
                            <input type="password" placeholder="Password" name='password' value={password} onChange={handleChange} minLength="6" />
                        </div>
                        <div className="form-group">
                            <input type="password" placeholder="Confirm Password" name='password2' value={password2} onChange={handleChange}  minLength="6" />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Register" className="btn btn-primary" />
                        </div>
                        <p className="my-1">
                            Already have an account? <Link to="/login">Sign in</Link>
                        </p>
                </form>
                <div className="seperator-or-line  m-1"><span>OR</span></div>
                <div className="social">
                    <SocialLogin/>
                </div>
        </div>
        </Fragment>
    );

    }

const mapStateToProps = state =>({
    isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps,{register})(Register);
    