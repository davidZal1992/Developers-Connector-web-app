import React,{Fragment , useState} from 'react'
import '../../../App.scss'
import {Link} from 'react-router-dom';
export const Login = () => {
    const [formDate,setFormData] = useState({
        email:'',
        password:'',

    });
    const {email,password} = formDate;

    const handleChange = e => setFormData({...formDate,[e.target.name]:e.target.value})  //Save the values of inputs

    const  submitDetails = async e => {
        e.preventDefault();
    }

    return <Fragment>
        <section className="container">
        <div className="left-box">
          <h1 className="large text-primary">
          Sign Up
        </h1>
        <p className="lead"><i className="fas fa-user"></i> Sign into your account</p>
        <form action="dashboard.html" onSubmit={submitDetails}>
                 <input type="email" placeholder="Email" name='email'value={email}  onChange={handleChange} required />
                <input type="password" placeholder="Password" name='password' value={password} onChange={handleChange} minLength="6" />
               <input type="submit" value="Login" className="btn btn-primary" />
        </form>
        <p className="my-1">
            Dont have an account? <Link to="/register">Sign up</Link>
        </p>
        </div>
        <div className="right-box">
            <div className="right-box-inner"></div>
            <span className="signwith">Sign in with Social Network</span>
            <button className="social google"> <i className="fa fa-google fa-fw"></i>    Log in with Google+</button>
            <button className="social twitter"> <i className="fa fa-twitter fa-fw"></i>   Log in with Twitter</button>
            <button className="social github"><i className="fab fa-github"></i>    Log in with Github</button>
            </div>
            <div className="or">OR</div>
        </section>
        </Fragment>
    
}
