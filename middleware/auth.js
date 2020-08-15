const jwt=require('jsonwebtoken')
const config=require('config')

module.exports = (req,res,next) => {
//Get token
const token=req.header('x-auth-token');
//Check if is there any token
if(!token)
{
    return res.status(401).json({msg: 'No token, authorization denied'});
}

//Verify
try{
    const decoded = jwt.decode(token,config.get('jwtSecret'))
    req.user = decoded.user;
    next();
}
catch(err){
    res.status(401).json({msg:'Token is not valid'});
}
}
