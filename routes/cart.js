const {addToCart,userCart,removeProductFromCart,clearCart,decreaseProductQty}=require('../controllers/cart')
const {authenticated}=require('../middleware/auth')
const express =require('express');

const router=express.Router();


//add to cart
router.post("/add",authenticated,addToCart);
router.get('/user',authenticated,userCart);
router.delete('/delete/:productId',authenticated,removeProductFromCart)
router.delete('/clear',authenticated,clearCart);
router.post('/--qty',authenticated,decreaseProductQty);
module.exports=router;