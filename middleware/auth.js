const jwt =require('jsonwebtoken');
const User =require('../models/user');
const authenticated=async(req,res,next)=>{
    const token=req.header('Auth');
    
    if(!token) return res.json({message:"Login First"});
    

    
    const decoded=jwt.verify(token,"Babu@1234")
    
    const id=decoded.userId;
let user=await User.findById(id);

if(!user) res.json({message:"User Not Found"});

req.user=user;
    next();

}

module.exports={authenticated};