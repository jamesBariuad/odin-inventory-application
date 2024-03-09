const Product = require("../models/product")
const Category = require("../models/category")
const asyncHandler =require('express-async-handler')

//homepage
exports.index= asyncHandler(async(req,res,next)=>{
    const [numberOfProducts, numberOfCategories] = await Promise.all([
        Product.countDocuments({}).exec(),
        Category.countDocuments({}).exec()

    ])
    res.render("index", {
        title: "Inventory App",
        numberOfProducts: numberOfProducts,
        numberOfCategories: numberOfCategories
    })    
})

//display all products
exports.productList = asyncHandler(async(req,res,next)=>{
    res.send("not implemented yet")
})

//display detail of a specific product
exports.productDetails = asyncHandler(async(req,res,next)=>{
    res.send("not implementde product detail")
})

//display product create form on GET
exports.productCreateGet = asyncHandler(async(req,res,next)=>{
    res.send("not implementde create on get")
})
//handle product create on POST
exports.productCreatePost = asyncHandler(async(req,res,next)=>{
    res.send("not implementde create on post")
})

//display product delete form on GET
exports.productDeleteGet = asyncHandler(async(req,res,next)=>{
    res.send("not implementde delete on get")
})

//handle product delete on POST
exports.productDeletePost = asyncHandler(async(req,res,next)=>{
    res.send("not implementde delete on post")
})

//display product update form on GET
exports.productUpdateGet = asyncHandler(async(req,res,next)=>{
    res.send("not implementde update on get")
})

//handle product update on POST
exports.productUpdatePost = asyncHandler(async(req,res,next)=>{
    res.send("not implementde update on post")
})

