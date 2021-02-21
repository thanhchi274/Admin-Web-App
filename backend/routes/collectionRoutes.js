const { test,getCollection} =require( "../controllers/collectionController");
const express =require( 'express')
const router = express.Router()
router.route('/:collectionId/product')
.get(getCollection)
.post(test)
module.exports =router
