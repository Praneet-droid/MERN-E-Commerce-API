const {register,profile,login,getAllUser}=require('../controllers/user')
const express =require('express');
const {authenticated}=require('../middleware/auth')
const router=express.Router();





//register user

router.route("/register").post(register);
//login user
router.route("/login").post(login);

//get all users
router.route('/users').get(getAllUser);
//get user profile
router.get('/profile',authenticated,profile)

module.exports=router;