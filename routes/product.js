const {addProduct,getProducts,deleteProductsById,updateProductsById,getProductsById}=require('../controllers/product')
const express =require('express');

const router=express.Router();

router.route('/add').post(addProduct);
router.route('/all').get(getProducts);
router.route('/:id').get(getProductsById)
router.route('/:id').put(updateProductsById)
router.route('/:id').delete(deleteProductsById);

module.exports=router;