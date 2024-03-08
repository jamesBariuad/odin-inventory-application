const express = require('express')
const router = express.Router()


const productController = require('../controllers/productController')
const categoryController = require("../controllers/categoryController")

//PRODUCT Routes
router.get("/", productController.index)
router.get("/products", productController.productList)
router.get("/product/:id", productController.productDetails)
router.get('/product/create', productController.productCreateGet)
router.post('/product/create', productController.productCreatePost)
router.get('/product/:id/delete', productController.productDeleteGet)
router.post('/product/:id/delete', productController.productDeletePost)
router.get('/product/:id/update', productController.productUpdateGet)
router.post('/product/:id/update', productController.productUpdatePost)

//Category Routes
router.get("/categories", categoryController.categoryList)
router.get("/category/:id", categoryController.categoryDetails)
router.get('/category/create', categoryController.categoryCreateGet)
router.post('/category/create', categoryController.categoryCreatePost)
router.get('/category/:id/delete', categoryController.categoryDeleteGet)
router.post('/category/:id/delete', categoryController.categoryDeletePost)
router.get('/category/:id/update', categoryController.categoryUpdateGet)
router.post('/category/:id/update', categoryController.categoryUpdatePost)

module.exports = router