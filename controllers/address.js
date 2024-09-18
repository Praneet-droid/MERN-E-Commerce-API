const  Address=require('../models/address');
const addAddress = async (req, res) => {
  let { fullName, address, city, state, country, pincode, phoneNumber } =  req.body;
  
let userId=req.user;
  let userAddress = await Address.create({
    userId,
    fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber
});


  res.json({message:"Address Added",success:true});
};

const getAddress=async(req,res)=>{

  let address=await Address.find({userId:req.user}).sort({createdAt:-1});

  res.json({message:"address",userAddress:address[0]});
}


module.exports={addAddress,getAddress};