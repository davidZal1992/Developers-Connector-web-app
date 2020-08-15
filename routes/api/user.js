const express = require('express');
const router=express.Router();
const gravtar = require('gravatar');
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator')

const User = require('../../moduls/User');

//@route GET/api/users 
//@desc Test route
//@access Public

router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid e-mail').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min:6})
    ],
     async (req,res)=>  {  
        console.log(req)
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
    
        const {name,email,password} = req.body;
        //Check if user is already exists
        try{
        let user= await User.findOne({email});
        if(user)
        {
            return res.status(400).json({errors: [{msg: 'The email is already exists' }]});
        }
        
        //Avatar creatoin
        

        const avatar = gravtar.url(email,{
            s: '200', 
            r: 'pg', 
            d: 'mm'
        });


        //User Creation
        user=new User({
            name,
            email,
            password,
            avatar
        });
        

        //Password bcrypt

        const salt= await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);
        await user.save();

         //Genrate JWT Token

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
    catch(error){
            console.error(error.msg)
            res.status(500).send('Server error');
    }

      
});
module.exports = router;