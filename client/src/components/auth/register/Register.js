import React,{Fragment , useState} from 'react'
import {Link,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import './Register.css'

import {register} from '../../../actions/auth';

import Alert from '../../alert/Alert';
import SocialLogin from '../social-login/SocialLogin'


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
        return <Redirect to="/posts"/>
     }

    return (
    <Fragment>
        <div className="container-auth">
            <div className="left-box">
                <Alert/>
                <h1 className="large text-primary">Sign In</h1>
                <p className="lead">
                    <i className="fas fa-user"></i>
    {' '}Create Your Account
                </p>
                <form className="form" action="dashboard.html" onSubmit={submitDetails}>
                        <input type="text" placeholder="Name" name='name' value={name} onChange={handleChange} />
                        <input type="email" placeholder="Email" name='email' value={email}  onChange={handleChange}  />
                        <input type="password" placeholder="Password" name='password' value={password} onChange={handleChange} minLength="6" />
                        <input type="password" placeholder="Confirm Password" name='password2' value={password2} onChange={handleChange}  minLength="6" />
                        <input type="submit" value="Register" className="btn btn-primary" />
                </form>
                <p className="my-1">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
            <div className="right-box">
                <SocialLogin/>
            </div>]==
            <div className="or">OR</div>
        </div>
        </Fragment>
    );
};

const mapStateToProps = state =>({
    isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps,{register})(Register);
    