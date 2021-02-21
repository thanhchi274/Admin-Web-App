const { getProducts, getProductById,getCategory,getSales,getRelatedItems,deleteProduct,deleteProducts,updateProduct,updateProducts,createProduct} =require( "../controllers/productController.js");
const express =require( 'express')
const router = express.Router()
//GET
router.route('/').get(getProducts).post(createProduct)
router.get('/item',getProductById)
router.get('/category',getCategory)
router.get('/sales',getSales)
router.get('/related_product',getRelatedItems)
router.get('/search_suggest')
router.get('/top_keywords')
//POSt
router.post('/create_product',createProduct)
// //PUT
router.put('/updateProduct',updateProduct)
router.put('/updateProducts',updateProducts)
// //DELETE
router.delete('/delete_item',deleteProduct)
router.delete('/delete_items',deleteProducts)
module.exports =router
