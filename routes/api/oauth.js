const express = require('express');
const router=express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const passport = require('passport')
const axios = require('axios')
const User = require('../../moduls/User')

//@route GET/api/oauth/github
//@desc auth with github account
//@access Public
router.get('/github', async (req,res) => {
    try{
    res.redirect('https://github.com/login/oauth/authorize/?client_id='+config.get('githubClientId'))
    }
    catch(err){
        console.log(err.response)
    }
})

//@route GET/api/oauth/github/callback
//@desc redirect after login
//@access Public
router.get('/github/callback', async (req,res) => {
    const {query} = req;
    const code = query.code;
    try{
        if(!code)
          return res.status(404).json({msg : 'Autherization failed'})
        else{
          const gitAuthDetails = {
            client_id: config.get('githubClientId'),
            client_secret: config.get('githubSecret'),
            code: code
            
        }
          const headers = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
          }
          const response=await axios.post('https://github.com/login/oauth/access_token',gitAuthDetails,headers)
          access_token=response.data.split('=')[1].split('&')[0]

          const userResponse=await axios.get('https://api.github.com/user',{ headers: { Authorization: 'token ' + access_token } })

          //Lets asssume that i store here a new user to my DB with the all github details e.g username, email ...
          // and create a payload for jwt.
          // Now i want to generate new JWT for the new user , and problem is here. to where i need send my token? 
          // there is any function in my client side that listening and waiting for response.
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {expiresIn:360000},
                (err,token) => {
                    if(err) throw err;
                    //What i need to do with my token?
                    res.redirect('http://localhost:3000/dashboard')
                }
            );


        }
    }
    catch(err){
    console.log(err)
    res.redirect('http://localhost:3000/login')
    }
})


module.exports = router;