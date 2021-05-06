const { getProducts, getProductById,getCategory,getSales,getRelatedItems,deleteProduct,deleteProducts,
          searchProducts,updateProduct,updateProducts,createProduct,updateQuantityProduct,postCommentProduct} =require( "../controllers/productController.js");
const {getComment, getCommentById } = require("../controllers/commentController")
const express =require( 'express')
const router = express.Router()
//GET
router.route('/').get(getProducts).post(createProduct)
router.get('/item',getProductById)
router.get('/category',getCategory)
router.get('/sales',getSales)
router.get('/related_product',getRelatedItems)
router.get("/search",searchProducts)
//POST
router.post('/create_product',createProduct)
router.post('/post_comment',postCommentProduct)
// //PUT
router.put('/updateProduct',updateProduct)
router.put('/updateProducts',updateProducts)
router.put('/changeStatus',updateQuantityProduct)
// //DELETE
router.delete('/delete_item',deleteProduct)
router.delete('/delete_items',deleteProducts)
module.exports =router
