const Products = require("../models/product");

//add Product
const addProduct = async (req, res) => {
  const { title, description, price, category, qty, imagesrc, createdAt } =
    req.body;

  try {
    let product=await Products.create({title, description, price, category, qty, imagesrc, createdAt})
    res.json({message:"Product Added Successfully",product});

  } catch (error) {


    res.json({message:error.message});
  }
};
//get products

const getProducts=async(req,res)=>{
  try {
    let product=await Products.find().sort({createdAt:-1});

    res.json(product);
  } catch (error) {
    res.json({message:error.message});
  }
}
//find product by id
const getProductsById=async(req,res)=>{
  const id=req.params.id;

  try {
    let product=await Products.findById(id);
if(!product) return res.json("Invalid Id");
    res.json({message:"Specific Product",product});
  } catch (error) {
    res.json({message:error.message});
  }
}
// update product by id
const updateProductsById=async(req,res)=>{
  const id=req.params.id;
  try {
    let product=await Products.findByIdAndUpdate(id,req.body,{new:true});
if(!product) return res.json("Invalid Id");
    res.json({message:"Product Updates Successfully",product});
  } catch (error) {
    res.json({message:error.message});
  }
}
const deleteProductsById=async(req,res)=>{
  const id=req.params.id;
  try {
    let product=await Products.findByIdAndDelete(id);
if(!product) return res.json("Invalid Id");
    res.json({message:"Product Deleted Successfully",product});
  } catch (error) {
    res.json({message:error.message});
  }
}

module.exports={addProduct,getProducts,updateProductsById,getProductsById,deleteProductsById};
