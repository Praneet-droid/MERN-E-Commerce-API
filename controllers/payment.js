const Payment  = require("../models/payment");
const Razorpay = require("razorpay");
const dotenv =require('dotenv');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const checkout = async (req, res) => {
  const { amount, cartItems, userShipping, userId } = req.body;

  try {
    const { amount, cartItems, userShipping, userId } = req.body;

    const options = {
      amount: amount * 100, // amount in the smallest currency unit (paisa for INR)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    // Create the Razorpay order
    const order = await razorpay.orders.create(options);

    console.log(order);

    // Send a successful response back to the client
    res.json({
      orderId: order.id,
      amount: amount,
      cartItems,
      userShipping,
      userId,
      paystatus: "Created",
    });
  } catch (error) {
    console.error("Error creating order:", error);

    // Send an error response back to the client
    res.status(500).json({
      message: "Failed to create order",
      error: error.message || error,
    });
  }
};

const verify = async (req, res) => {
  const {
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
  } = req.body;


let verifyPayment= await Payment.create({    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,payStatus:"Paid",});


 res.json({message:"Payment SuccessFul",success:true,verifyPayment})
};


const userOrder= async(req,res)=>{
  let userId=req.user._id.toString();
  let orders=await Payment.find({userId:userId}).sort({orderDate:-1});
  res.json(orders);
}

const allOrders = async (req,res) =>{
 
  let orders = await Payment.find().sort({ orderDate :-1});
  res.json(orders)
}
module.exports = {checkout, verify,userOrder,allOrders };
