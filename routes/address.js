const express =require('express');
const {addAddress,getAddress}=require('../controllers/address')
const {authenticated}=require('../middleware/auth')
const router=express.Router();

router.post('/add',authenticated,addAddress)


router.get('/get',authenticated,getAddress);
module.exports=router;
