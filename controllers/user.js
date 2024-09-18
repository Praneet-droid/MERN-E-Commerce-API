const users=require('../models/user');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');

  
    const register = async (req, res) => {
        const { name, email, password } = req.body;
    
        // Validate input fields
        if (!name || !email || !password) {
          return res.json({ message: "All fields are required", success: false });
        }
      
        try {
          // Check if the user already exists
          let existingUser = await users.findOne({ email });
         
          if (existingUser) {
            return res.json({ message: "User already exists", success: false });
          }
      
          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);
      
          // Create new user
          let user = await users.create({ name, email, password: hashedPassword });
      
          res.status(201).json({ message: "User Registered Successfully", success: true });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Server error", success: false });
        }
      }
    

const login= async(req,res)=>{

const {email,password}=req.body;

    try {
    const user=await users.findOne({email});
    if(!user)return res.json("User Not Found");
    const validPassword= await bcrypt.compare(password,user.password);
    if(!validPassword) return res.json({message:"Inavlid Credentials",success:false});
  
  const token=jwt.sign({userId:user._id},"Babu@1234",{expiresIn:'1h'})
    res.json({message:`Welcome ${user.name}`,token,success:true})
} catch (error) {
 res.json({message:error.message});    
}

}


const getAllUser=async(req,res)=>{
    try {
        let user=await users.find().sort({createdAt:-1});
        if(!user) return res.json("No User Found");
        res.json(user);
    } catch (error) {
        res.json({message:error.message});
    }



}


const profile=async(req,res)=>{
  
    res.json({user:req.user});
}

module.exports={register,login,getAllUser,profile};