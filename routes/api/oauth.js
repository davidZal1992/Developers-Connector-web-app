const express = require('express');
const router=express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const axios = require('axios')
const uniqid = require('uniqid');
const User = require('../../moduls/User')
const {OAuth2Client} = require('google-auth-library');
const googleClient = new OAuth2Client("287117475633-nb39be349ifejjsr162hhblrheo5srdg.apps.googleusercontent.com")


//@route GET/api/oauth/google-auth
//@desc google auth
//@access Public
router.post('/google-auth', async (req,res) => {
    try{
    const {tokenId} = req.body; 
    const resOauth = await googleClient.verifyIdToken( {idToken: tokenId, audience:'287117475633-nb39be349ifejjsr162hhblrheo5srdg.apps.googleusercontent.com'})
  
    const {email_verified , name , picture , email } = resOauth.payload

    if(email_verified){
      const user = await User.findOne({email})

      
      //If user exists
      if(user){

          const payload= {
            user:{
                id:user.id
            }
          };
        
          jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn:360000},
            (err,token) => {
                if(err) throw err;
                res.json({token});
            }
        );
      }
      else{ // Else
          const password =  email+uniqid();
          newUser=new User({
            name,
            email,
            password,
            avatar: picture
        });

         await newUser.save();        


         const payload= {
          user:{
              id:user.id
          }
        };
          //Generate new JWT
          jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn:360000},
            (err,token) => {
                if(err) throw err;
                res.json({token});
            }
        );
     }  
    }
    }

    catch(err){

    }
})


//@route GET/api/oauth/facebook-auth
//@desc facebook auth
//@access Public
router.post('/facebook-auth', async (req,res) => {

  try{
  const {accessToken,userId} = req.body; 
  
  const facebookFieldsUrl = `https://graph.facebook.com/${userId}?fields=id,name,email,picture.width(150).height(150)&access_token=${accessToken}`
  const imageProfileUrl = `https://graph.facebook.com/10223518550414489/picture?height=200`

  const resOauth = await axios.get(facebookFieldsUrl)


  const {name,email} = resOauth.data
  const picture = resOauth.data.picture.data.url
  const user = await User.findOne({email})

    
  //If user exists
  if(user){

      const payload= {
        user:{
            id:user.id
        }
      };
    
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {expiresIn:360000},
        (err,token) => {
            if(err) throw err;
            res.json({token});
        }
    );
  }
  else{ // Else
      const password =  email+uniqid();
      newUser=new User({
        name,
        email,
        password,
        avatar: picture
    });

     await newUser.save();        


     const payload= {
      user:{
          id:user.id
      }
    };
      //Generate new JWT
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {expiresIn:360000},
        (err,token) => {
            if(err) throw err;
            res.json({token});
        }
    );
 }  
}

  catch(err){
  console.log(err)

  }
})


module.exports = router;