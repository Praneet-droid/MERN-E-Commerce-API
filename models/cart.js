const mongoose=require('mongoose');

const cartItemSchema=new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        require:true,
    },
    title:{type:String ,require:true,},
    price:{type:Number ,require:true,},
    qty:{type:Number ,require:true,},
    imagesrc:{type:String ,require:true,},
})


const cartSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        require:true,
    },
    items:[cartItemSchema],

})

const Cart=mongoose.model("cart",cartSchema);
module.exports=Cart;