const express = require('express');
const router=express.Router();
const request = require('request')
const config = require('config')
const auth = require('../../middleware/auth')
const {check , validationResult } = require('express-validator');


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
            res.status(400).json({msg : 'Profile not found'});
        }

        res.json(profile);
    }
        catch(err){ 
            console.error(err.message)
            if (err.name == 'CastError'){
                res.status(400).json({msg : 'Profile not found'});
            }
            res.status(500).send('Server Error')
    }
    }});
    
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
    if(website) profileFields.website=company;
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
        //Update
        if(profile)
        {
            profile=await Profile.findOneAndUpdate({user: req.user.id},{$set: profileFields} ,{new:true});
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
       const profiles=await Profile.find().sort({date:-1})
        res.json(profiles)
   }
   catch(err){
    console.error(err.message)
    res.status(500).send('Server error')
   }
})

//@route GET/api/profile/user/:user_id
//@desc Get all users profiles
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


//@route DELETE/api/profile/user/:user_id
//@desc Delete user profile
//@access Private

router.delete('/',auth, async (req,res) => {
    try{
     await Profile.findOneAndRemove({user:req.user.id}) //delete profile by user field
     await User.findOneAndRemove({_id:req.user.id}) //delete user by _id field

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


 
//@route DELETE/api/profile/experince/:exp_id
//@desc Delete user experimce
//@access Private
router.delete('/experience/:exp_id',auth, async (req,res) => {
    try{
     const profile=await Profile.findOne({user:req.user.id}); //get profile
     const toDelete=profile.experience.map(item=>item.id).indexOf(req.params.exp_id)
    
     profile.experience.splice(toDelte,1);

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
   const profile=await Profile.findOne({user:req.user.id}); //get profile
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

router.get('/github/:username', (req,res)=>{
    try{
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}}`,
            method:'GET',
            headers:{'user-agent': 'node.js'}
        };

        request(options,(err,response,body) =>{
            if(err)
            console.error(err)

            if(response.statusCode!==200)
           return  res.status(404).json({msg:'No github profile found'});

            return res.json(JSON.parse(body));
        })
        }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
})


module.exports = router;