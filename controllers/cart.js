const Cart=require('../models/cart');

const addToCart = async (req,res) =>{

    const {productId,title,price,qty,imagesrc}=req.body;

    const userId=req.user;
let cart=await Cart.findOne({userId});

  if(!cart){
    cart=new Cart({userId,items:[]});
  }

const cartItemIndex=cart.items.findIndex((item)=>item.productId.toString()===productId)

if(cartItemIndex > -1){
    cart.items[cartItemIndex].qty+=qty;
    cart.items[cartItemIndex].price =price*cart.items[cartItemIndex].qty;

}else{
    cart.items.push({productId,title,price,qty,imagesrc});
}


await cart.save();
res.json ({message:"Item Added To Cart",cart});




}
const userCart=async(req,res)=>{
    const userId=req.user;
    console.log(userId)
    let cart=await Cart.findOne({userId});
    if(!cart) res.json({message:"Cart NotFound"});

res.json({message:'User cart',cart});

}
//revome product from cart
const removeProductFromCart=async(req,res)=>{
const productId=req.params.productId;

    const userId=req.user;
    let cart=await Cart.findOne({userId});
    if(!cart) return res.json({message:"Cart Not Found"});

cart.items=cart.items.filter((item)=>item.productId.toString()!==productId);
await cart.save();
res.json({message:"Product Remove From Cart"});

}

const clearCart=async(req,res)=>{

    const userId=req.user;
    let cart=await Cart.findOne({userId});
    if(!cart) {
        cart=new cart({items:[]});

    }
    else{
        cart.items=[];
    }


    await cart.save();
res.json({message:"cart cleared"});


}

const decreaseProductQty=async(req,res)=>{
    const {productId,qty}=req.body;
    const userId=req.user;
    let cart=await Cart.findOne({userId});
   
    const cartItemIndex=cart.items.findIndex((item)=>item.productId.toString()===productId)

    if(!cart){
        cart=new Cart({userId,items:[]});
    }
    
   
if(cartItemIndex >  -1){
    const item=cart.items[cartItemIndex]
    
    if(item.qty >=qty){
        const pricePerUnit=item.price/item.qty
item.qty-=qty;
item.price-=pricePerUnit*qty
  

    }
    if (item.qty <= 0) {
        cart.items.splice(cartItemIndex, 1);
    }
   

}    
else{
    return res.json({message:"inavlid product Id"})
}
await cart.save();
res.json({message:"Items qty Decrease",cart});

}

module.exports={addToCart,userCart,removeProductFromCart,clearCart,decreaseProductQty}
