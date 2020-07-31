const express = require('express');
const {check,validationResult} = require('express-validator')
const router=express.Router();
const auth = require('../../middleware/auth')

const User = require('../../moduls/User');
const Post = require('../../moduls/Post');
const Profile = require('../../moduls/Profile');
//@route POST/api/post
//@desc Create a post
//@access private

router.post('/' ,[auth,[
    check('text','Text is required').not().isEmpty()
]],
async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
            return res.status(400).json({errors: errors.array()});
    }
    try{
    const user = await  User.findById(req.user.id).select('-password');

    const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user:req.user.id
    })

    const post=await newPost.save();
    res.json(post);
    }

   catch(err){
       console.error(err.message);
       res.status(500).send('Server error')
   }
});

//@route Post/api/posts
//@desc Create all post
//@access Private
router.get('/',auth, async (req,res) =>{
    try{
        const posts = await Post.find().sort({date: -1});
        res.json(posts);
    }
    catch(err)
    {
        console.error(err.message)
        res.status(500).send('Server error')
    }

})

//@route GET/api/post/:id
//@desc Get post by ID
//@access Private
router.get('/:id',auth, async (req,res) =>{
    try{
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({msg: 'Post not found'})
        }

        res.json(post);
    }
    catch(err)
    {
        console.error(err.message)
        if (err.name == 'CastError')
        return res.status(404).json({msg: 'Post not found'})
        res.status(500).send('Server error')
    }

})


//@route DELETE/api/post/:id
//@desc Get post by ID
//@access Private
router.delete('/:id',auth, async (req,res) =>{
    try{
        const post = await Post.findById(req.params.id)
        console.log(post)
        if(!post){
            return res.status(404).json({msg: 'Post not found'})
        }

        if(post.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'User not authorized'});
        }

        await post.remove();
        return res.send({msg:'post deleted'});
    }
    catch(err)
    {
        console.error(err.message)
        if (err.name == 'CastError')
        return res.status(404).json({msg: 'Post not found'})
        res.status(500).send('Server error')
    }

})


//@route PUT/api/unlike/:id
//@desc unlike post
//@access Private
router.put('/unlike/:id',auth, async (req,res) => {
  try{
    const post = await Post.findById(req.params.id)
    if(post.likes.filter(like => like.user.toString()===req.user.id).length===0){ //return true if there is a like of this user exicts
        return res.status(400).json({msg: 'Post never liked before'});

    }
    const removeIndex = post.likes.map((like)=>like.user.toString()).indexOf(req.user.id);
      post.likes.splice(removeIndex,1);
      await post.save();
      return res.json(post.likes)
  }
  catch(err){
      console.error(err.message)
    return res.status(500).send('Server error')
  }
})


///@route PUT/api/post/like/:id
//@desc like post 
//@access Private
router.put('/like/:id',auth, async (req,res) => {
    try{
      const post = await Post.findById(req.params.id)
      if(post.likes.filter(like => like.user.toString()===req.user.id).length>0){ //return true if there is a like of this user exicts
          return res.status(400).json({msg: 'Post already liked'});
  
      }
        post.likes.unshift({user: req.user.id});
        await post.save();
        return res.json(post.likes)
    }
    catch(err){
        console.error(err.message)
      return res.status(500).send('Server error')
    }
  })


//@route POST/api//:id
//@desc unlike post
//@access Private
router.post(
    '/comment/:id',[auth,[
        check('text','Text is required').not().isEmpty()
    ]],
    // checking for errors
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);
        console.log(post.comments)
        const newComment = {
          text: req.body.text,
          name: user.name,
          avatar: user.avatar,
          user: req.user.id
        };
        // add comment
        post.comments.unshift(newComment);
        await post.save();
        res.json(post.comments);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );
  


//@route DELETE/api/commemt/:id
//@desc unlike post
//@access Private
  router.delete('/comment/:id/:cm_id',auth,
     async (req,res) => {
    try{
      const post = await Post.findById(req.params.id)
      const removeIndex=post.comments.map(comment=>comment.id).indexOf(req.params.cm_id)

      //Check if comment exists
      if(!removeIndex)
      {
          return res.status(404).json({msg: "comment dosn exists"})
      }

      if(comment.user.toString()!==req.user.id)
      {
        return res.status(404).json({msg: "User mot authorized"})
      }
      post.comments.splice(removeIndex,1)
      await post.save();
      return res.json(post.comments)
    }
    catch(err){
        console.error(err.message)
      return res.status(500).send('Server error')
    }
  })
module.exports = router;