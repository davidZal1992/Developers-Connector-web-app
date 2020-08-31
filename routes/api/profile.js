const express = require('express');
const router=express.Router();
const axios = require('axios')
const multer = require('multer')
const config = require('config')
const fs = require('fs')
const auth = require('../../middleware/auth')
const {check , validationResult } = require('express-validator');

const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        var typeFile =file.originalname.split(".").pop();
        const fileName = req.user.id+"."+typeFile
        cb(null, fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'), false);
        }
    }
});


const Profile = require('../../moduls/Profile')
const User = require('../../moduls/User')

//@route GET/api/profile/me 
//@desc Get current users profile
//@access Private

router.get('/me',auth, async (req,res) => {
    {
        try{
        const profile = await  Profile.findOne({user: req.user.id}).populate('user' , ['name','avatar']);

        if(!profile){
            return res.status(400).json({msg : 'Profile not found'});
        }

        res.json(profile);
    }
        catch(err){ 
            console.error(err.message)
            if (err.name == 'CastError'){
                return res.status(400).json({msg : 'Profile not found'});
            }
            res.status(500).send('Server Error')
    }
    }});

//@route POST/api/profile/ 
//@desc Create or update profile picture for user
//@access Private

router.post('/upload' ,[auth, upload.single('imageProfile')], async  (req,res) =>{
    try{
        const url = req.protocol + '://' + req.get('host')
        let user= await User.findById(req.user.id);
        const profile = await Profile.findOne({user:req.user.id});
        console.log("The user is : " + user)
        //Update
        if(user)
        {
            user.avatar=url+ '/public/' + req.file.filename
            await user.save();
            return res.json(profile)
        }
    }
    catch(err){
        console.log(err)
    }
})



//@route POST/api/profile/ 
//@desc Create or update user profile
//@access Private

router.post('/' , [auth,
    [
    check('status','Status is required').not().isEmpty(),
    check('skills','Skills is required').not().isEmpty(),
    check('gender','Gender is required').not().isEmpty()
    ]],
    async (req,res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array ()});
    }
    const {
        company,
        website,
        location,
        gender,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;

    const profileFields = {}
    profileFields.social={}
    profileFields.user = req.user.id;

    if(company) profileFields.company=company;
    if(website) profileFields.website=website;
    if(gender) profileFields.gender=gender;
    if(location) profileFields.location=location;
    if(bio) profileFields.bio=bio;
    if(status) profileFields.status=status;
    if(githubusername) profileFields.githubusername=githubusername;
    if(skills){ 
        profileFields.skills=skills.split(',').map(skill => skill.trim());
    }
    

    if(facebook) profileFields.social.facebook=facebook;
    if(youtube) profileFields.social.youtube=youtube;
    if(twitter) profileFields.social.twitter=twitter;
    if(instagram) profileFields.social.instagram=instagram;
    if(linkedin) profileFields.social.linkedin=linkedin;

    try{
        let profile = await Profile.findOne({user: req.user.id})
        console.log(profile)
        //Update
        if(profile)
        {
            profile=await Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set: profileFields} ,
                {new:true});
        
            return res.json(profile);
        }
        //Create profile
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
    }
    catch(err){
        res.status(500).send('Server error')
    }
})

//@route GET/api/profile/
//@desc Get all users profiles
//@access Public
router.get('/' , async (req,res) => {
   try{
       const profiles=await Profile.find().populate('user',['name','avatar'])
        res.json(profiles)
   }
   catch(err){
    console.error(err.message)
    res.status(500).send('Server error')
   }
})

//@route GET/api/profile/user/:user_id
//@desc user profile
//@access Public
router.get('/user/:user_id' , async (req,res) => {
    try{
        const profile=await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar'])
        if(!profile)
        {
            return res.status(400).json({msg: 'There is no profile for this user'});
        }
         res.json(profile)
    }
    catch(err){
     console.error(err.message)
     res.status(500).send('Server error')
    }
 })


//@route DELETE/api/profile/
//@desc Delete user profile
//@access Private

router.delete('/',auth, async (req,res) => {
    try{
     await Profile.findOneAndRemove({user:req.user.id}) //delete profile by user field

     let user= await User.findById(req.user.id);

     const indexToCut  = user.avatar.lastIndexOf("/");
     let imageUrl = user.avatar.slice(indexToCut);

     await User.findOneAndRemove({_id:req.user.id}) //delete user by _id field
     
     if(fs.existsSync('public/'+imageUrl))
         fs.unlinkSync('public/'+imageUrl);

    res.json({msg: 'User deleted'})
    }
    catch(err)
    {
        console.error(err.message);
        res.status(500).send('Server error');
    }
  });
//@route PUT/api/profile/experinceuser
//@desc Update user experience
//@access Private
  router.put('/experience',[auth,[
      check('title','Title is required').not().isEmpty(),
      check('company','Company is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty()]] , async (req,res) => {
    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const {title,company,location,from,to,current,description} = req.body;
        
        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }

        const profile = await Profile.findOne({user:req.user.id})
        


        profile.experience.unshift(newExp);

        await profile.save();
         res.json(profile)
    }
    catch(err){
     res.status(500).send('Server error')
    }
 })


 
//@route DELETE/api/profile/experience/:exp_id
//@desc Delete user experimce
//@access Private
router.delete('/experience/:exp_id',auth, async (req,res) => {
    try{
     const profile = await Profile.findOne({user:req.user.id}); //get profile

     const toDelete=profile.experience.map(item=>item.id).indexOf(req.params.exp_id)
    
     profile.experience.splice(toDelete,1);

     await profile.save();
     res.json(profile);
    
    }
    catch(err)
    {
        console.error(err.message);
        res.status(500).send('Server error');
    }
  });



//@route PUT/api/profile/education
//@desc Update user education
//@access Private
router.put('/education',[auth,[
    check('school','School is required').not().isEmpty(),
    check('fieldofstudy','Field of study is required').not().isEmpty(),
    check('degree','Degree is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()]] , async (req,res) => {
  try{
      const errors=validationResult(req);
      if(!errors.isEmpty()){
          return res.status(400).json({errors: errors.array()});
      }

      const {school,fieldofstudy,degree,from,to,current,description} = req.body;
      
      const newEdu = {
          school,
          fieldofstudy,
          degree,
          from,
          to,
          current,
          description
      }

      const profile = await Profile.findOne({user:req.user.id})

      profile.education.unshift(newEdu);

      await profile.save();
       res.json(profile)
  }
  catch(err){
   res.status(500).send('Server error')
  }
})



//@route DELETE/api/profile/education/:edu_id
//@desc Delete user education
//@access Private
router.delete('/education/:edu_id',auth, async (req,res) => {
  try{
    const profile = await Profile.findOne({user:req.user.id}); //get profile
    console.log(profile)
   const toDelete=profile.education.map(item=>item.id).indexOf(req.params.edu_id)
  
   profile.education.splice(toDelete,1);

   await profile.save();
   res.json(profile);
  
  }
  catch(err)
  {
      console.error(err.message);
      res.status(500).send('Server error');
  }
});

//@route GET/api/profile/github/:username
//@desc Get user repos from Github
//@access Public

router.get('/github/:username',async (req,res)=>{
        try{
            const uri = encodeURI(
                `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
              );
              const headers = {
                'user-agent': 'node.js',
                Authorization: `token ${config.get('githubToken')}`
              };
              
              const gitHubResponse = await axios.get(uri, { headers });
              return res.json(gitHubResponse.data);
            }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

//@route PUT/api/profile/rating/:id
//@desc Update user rate
//@access Private
router.put('/rating/:user_id',auth, async (req,res) => {
  try{
      const profile = await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar']);
      const {ratingValue} = req.body

     //Check if the user already rate - if no add new rate , else update

      const indexOfRate = profile.rating.rates.map( (rate) => {return rate.user}).indexOf(req.user.id)

      if(indexOfRate!=-1){
        profile.rating.totalRates=profile.rating.totalRates-profile.rating.rates[indexOfRate].rate;
        profile.rating.rates[indexOfRate].rate= ratingValue;
      }
      else{
        profile.rating.rates = [...profile.rating.rates,{user: req.user.id , rate: ratingValue}]
        console.log(profile.rating.rates)
      }

        const oldValue = profile.rating.totalRates
        profile.rating.totalRates=oldValue+ratingValue;

      await profile.save();
      res.json(profile);       
  }
  catch(err){
    res.status(500).send('Server error')
  }
})

//@route GET/api/profile/rating/top
//@desc Get 4 users with maximum rate
//@access Public

router.get('/rating/top',async (req,res)=>{
    try{
        const profiles= await Profile.find().populate('user',['name','avatar']);
        const ratedProfiles = profiles.filter( profile =>profile.rating.totalRates!==0)

        const topRated = ratedProfiles.sort((a,b) =>(b.rating.totalRates/b.rating.rates.length)-(a.rating.totalRates/a.rating.rates.length));
        
        res.send(topRated.slice(0,4))

        }
catch(err){
    console.error(err.message);
    res.status(500).send('Server error');
}
})


module.exports = router;