import React,{Fragment} from 'react';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import {GoogleLoginButton} from "react-social-login-buttons";
import {connect} from 'react-redux';
import {googleAuth,facebookAuth} from '../../../actions/auth'
import './SocialLogin.css'

const SocialLogin = ({googleAuth,facebookAuth}) =>{ 

    const googleResponse =  (response) =>{
      googleAuth(response.tokenId);
    }  

    const facebookResponse =  (response) =>{
      facebookAuth(response.accessToken,response.userID)
    // githubAuth(response.tokenId);
  }   
  return (
    <Fragment>
        <GoogleLogin
            clientId="287117475633-nb39be349ifejjsr162hhblrheo5srdg.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={googleResponse}
            render={renderProps => (
              <GoogleLoginButton onClick={renderProps.onClick} />
            )}
            cookiePolicy={'single_host_origin'}
         />
         <FacebookLogin
            appId="235443407778826"
            fields="name,email,picture"
            callback={facebookResponse}
            cssClass="my-facebook-button-class"
            icon="fa-facebook"
        />,
    </Fragment>
  )
}


export default connect(null,{googleAuth,facebookAuth})(SocialLogin);