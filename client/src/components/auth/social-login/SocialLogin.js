import React,{Fragment} from 'react';
import { GoogleLogin } from 'react-google-login';
import {GoogleLoginButton} from "react-social-login-buttons";
import {connect} from 'react-redux';
import {googleAuth} from '../../../actions/auth'
import './SocialLogin.css'

const SocialLogin = ({googleAuth}) =>{ 

    const googleResponse =  (response) =>{
      googleAuth(response.tokenId);
    }  

  return (
    <Fragment>
      <div className="mt">
        <GoogleLogin
            clientId="287117475633-nb39be349ifejjsr162hhblrheo5srdg.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={googleResponse}
            render={renderProps => (
              <GoogleLoginButton onClick={renderProps.onClick} />
            )}
            cookiePolicy={'single_host_origin'}
         />
        </div>
    </Fragment>
  )
}


export default connect(null,{googleAuth})(SocialLogin);