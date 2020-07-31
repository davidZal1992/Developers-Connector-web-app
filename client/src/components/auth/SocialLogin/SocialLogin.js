import React from 'react';
import './SocialLogin.css'
function SocialLogin(props) { 
  return (
    <div>
        <div className="right-box-inner"></div>
        <div className="wrap-buttons">
            <div className="signwith">Sign in with Social Network</div>
            <button className="social google"> <i className="fa fa-google fa-fw"></i>    Log in with Google+</button>
            <button className="social twitter"> <i className="fa fa-twitter fa-fw"></i>   Log in with Twitter</button>
            <button className="social github"><i className="fab fa-github"></i>    Log in with Github</button>
        </div>
    </div>
  )
}
 
export default SocialLogin;