
const {authenticated}=require('../middleware/auth')
const express =require('express');
const router=express.Router();
const {checkout,verify,userOrder,allOrders}=require('../controllers/payment');

//checkout
router.post('/checkout',checkout);

//verify & save To Db
router.post('/verify-payment',verify)


//User Order

router.get('/userorder',authenticated,userOrder);

// All order's
router.get("/orders", allOrders);



module.exports=router;

