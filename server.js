const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const cartRouter= require("./routes/cart");
const PORT = 8000;
const bodyParser= require('express')
const cors=require('cors');
const addressRouter= require('./routes/address')
const paymentRouter=require('./routes/payment');

app.use(bodyParser.json());
mongoose
  .connect(
    "mongodb+srv://vngh11410:AVQu1QAMLJzys8A7@cluster0.esxk8pr.mongodb.net/",
    {
      dbName: "MERN-E_Commerce",
    }
  )
  .then(() => console.log("Mongo Db Connected"))
  .catch((err) => console.log(err));
app.use(cors({
  origin:true,
  methods:["GET","PUT","DELETE","POST"],
  credentials:true
}))
//home route
app.get("/", (req, res) => {
  res.json({ message: "Home route" });
});
//user Router

app.use("/api/user", userRouter);
//Product Router
app.use("/api/product",productRouter);

//cart Router
app.use("/api/cart",cartRouter);

//address router

app.use('/api/address',addressRouter);

//payment Router


app.use('/api/payment',paymentRouter);
app.listen(PORT, () => {
  console.log(`Server Is Running ${PORT}`);
});
